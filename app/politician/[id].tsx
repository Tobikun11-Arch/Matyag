import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  Animated
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

import {
  getById,
  PARTIES,
  getExtendedById,
  type ExperienceEntry,
  getLCFById,
  type LawEntry,
  type CaseEntry,
  type FamilyMember
} from '@/constants/dataset';

// ─── Colour helpers ───────────────────────────────────────────────────────────
const POSITION_ACCENT: Record<string, string> = {
  President: '#f59e0b',
  'Vice President': '#a855f7',
  Senator: '#3b82f6',
  'Party-list': '#10b981'
};

const STATUS_STYLES: Record<string, {bg: string; text: string; icon: string}> =
  {
    'ENACTED INTO LAW': {bg: '#dcfce7', text: '#15803d', icon: '✓'},
    'SECOND READING': {bg: '#dbeafe', text: '#1d4ed8', icon: '○'},
    'COMMITTEE LEVEL': {bg: '#fef9c3', text: '#854d0e', icon: '◷'},
    VETOED: {bg: '#fee2e2', text: '#b91c1c', icon: '✕'},
    'LAPSED INTO LAW': {bg: '#f3f4f6', text: '#374151', icon: '↷'}
  };

const FLAG_COLORS: Record<string, {bg: string; text: string}> = {
  'FLAG: RESOURCE ALLOCATION': {bg: '#fef3c7', text: '#92400e'},
  'FLAG: PROCUREMENT ANOMALY': {bg: '#fee2e2', text: '#991b1b'},
  'FLAG: LIFESTYLE CHECK': {bg: '#fce7f3', text: '#9d174d'},
  'FLAG: PLUNDER': {bg: '#fee2e2', text: '#7f1d1d'},
  'FLAG: GRAFT': {bg: '#fef3c7', text: '#78350f'},
  'FLAG: SECTOR LEGITIMACY': {bg: '#ede9fe', text: '#5b21b6'},
  'FLAG: CONFLICT OF INTEREST': {bg: '#ffedd5', text: '#9a3412'}
};

const CASE_STATUS_BADGE: Record<string, {bg: string; text: string}> = {
  PENDING: {bg: '#fee2e2', text: '#b91c1c'},
  DISMISSED: {bg: '#dcfce7', text: '#15803d'},
  ACQUITTED: {bg: '#dcfce7', text: '#15803d'},
  'UNDER REVIEW': {bg: '#fef9c3', text: '#854d0e'}
};

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = ['Experience', 'Records', 'Laws', 'Cases', 'Family'] as const;
type Tab = (typeof TABS)[number];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Experience ────────────────────────────────────────────────────────────────
function ExperienceTab({entries}: {entries: ExperienceEntry[]}) {
  if (!entries || entries.length === 0) {
    return (
      <EmptyState
        icon="briefcase-outline"
        message="No experience records available."
      />
    );
  }
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {entries.map((entry, i) => (
        <View key={i} className="flex-row mb-6">
          {/* Timeline spine */}
          <View className="items-center mr-4" style={{width: 20}}>
            <View className="w-3 h-3 rounded-full bg-[#1e293b] mt-1" />
            {i < entries.length - 1 && (
              <View className="w-0.5 flex-1 bg-slate-200 mt-1" />
            )}
          </View>

          {/* Card */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <Text className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
              {entry.startYear} — {entry.endYear}
            </Text>
            <Text className="text-[16px] font-bold text-slate-800 leading-tight mb-0.5">
              {entry.title}
            </Text>
            <Text className="text-[13px] text-slate-500 mb-3">
              {entry.organization}
            </Text>
            <Text className="text-[13px] text-slate-600 leading-relaxed mb-3">
              {entry.description}
            </Text>
            {/* Tags */}
            <View className="flex-row flex-wrap gap-2">
              {entry.tags.map(tag => (
                <View
                  key={tag}
                  className="bg-slate-100 px-2.5 py-1 rounded-full"
                >
                  <Text className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ── Records ───────────────────────────────────────────────────────────────────
function RecordsTab({politicianId}: {politicianId: string}) {
  const ext = getExtendedById(politicianId);
  if (!ext)
    return (
      <EmptyState icon="stats-chart-outline" message="No records available." />
    );
  const r = ext.records;

  const stats = [
    {label: 'Laws Passed', value: r.lawsPassed, color: '#10b981'},
    {label: 'Bills Authored', value: r.billsAuthored, color: '#3b82f6'},
    {label: 'Co-Authored', value: r.billsCoAuthored, color: '#a855f7'}
  ];

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {/* Attendance card */}
      <View className="bg-[#1e293b] rounded-2xl p-5 mb-4">
        <Text className="text-slate-400 text-[12px] font-medium uppercase tracking-widest mb-1">
          Attendance Rate
        </Text>
        <Text className="text-white text-[42px] font-bold leading-tight">
          {r.attendanceRate > 0 ? `${r.attendanceRate}%` : 'N/A'}
        </Text>
        {r.attendanceSessions && (
          <Text className="text-slate-400 text-[13px] mt-1">
            {r.attendanceSessions}
          </Text>
        )}
        {/* Progress bar */}
        {r.attendanceRate > 0 && (
          <View className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-emerald-400 rounded-full"
              style={{width: `${r.attendanceRate}%`}}
            />
          </View>
        )}
      </View>

      {/* Stat row */}
      <View className="flex-row gap-3 mb-4">
        {stats.map(s => (
          <View
            key={s.label}
            className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm border border-slate-100"
          >
            <Text className="text-[28px] font-bold" style={{color: s.color}}>
              {s.value}
            </Text>
            <Text className="text-[11px] text-slate-500 text-center mt-0.5 leading-tight">
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Legislative Impact */}
      <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <View className="flex-row items-center mb-3">
          <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center mr-2">
            <Ionicons name="flash-outline" size={15} color="#1e293b" />
          </View>
          <Text className="text-[15px] font-bold text-slate-800">
            Legislative Impact
          </Text>
        </View>
        <Text className="text-[13px] text-slate-600 leading-relaxed">
          {r.legislativeImpactSummary}
        </Text>
      </View>
    </ScrollView>
  );
}

// ── Laws ──────────────────────────────────────────────────────────────────────
function LawsTab({laws}: {laws: LawEntry[]}) {
  if (!laws || laws.length === 0) {
    return (
      <EmptyState
        icon="document-text-outline"
        message="No legislative records available."
      />
    );
  }
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {laws.map((law, i) => {
        const statusStyle =
          STATUS_STYLES[law.status] ?? STATUS_STYLES['COMMITTEE LEVEL'];
        return (
          <View
            key={i}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100"
          >
            {/* Bill number + role + date */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View
                  className={`px-2 py-0.5 rounded-md ${law.isRepublicAct ? 'bg-[#1e293b]' : 'bg-slate-100'}`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wide ${law.isRepublicAct ? 'text-white' : 'text-slate-500'}`}
                  >
                    {law.billNumber}
                  </Text>
                </View>
                <Text className="text-[11px] text-slate-400">
                  {law.role} · {law.date}
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text className="text-[15px] font-bold text-slate-800 leading-snug mb-1">
              {law.title}
            </Text>
            <Text className="text-[13px] text-slate-500 leading-relaxed mb-3">
              {law.description}
            </Text>

            {/* Status badge */}
            <View
              className="self-start flex-row items-center px-2.5 py-1 rounded-full mb-3"
              style={{backgroundColor: statusStyle.bg}}
            >
              <Text
                className="text-[11px] mr-1"
                style={{color: statusStyle.text}}
              >
                {statusStyle.icon}
              </Text>
              <Text
                className="text-[11px] font-semibold"
                style={{color: statusStyle.text}}
              >
                {law.status}
              </Text>
            </View>

            {/* Footer */}
            {(law.notableVote || law.coSponsors) && (
              <View className="flex-row items-center gap-4 border-t border-slate-100 pt-3">
                {law.notableVote && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="person-outline" size={12} color="#94a3b8" />
                    <Text className="text-[12px] text-slate-400">
                      Notable Vote:{' '}
                      <Text
                        className={`font-bold ${law.notableVote === 'YES' ? 'text-emerald-600' : law.notableVote === 'NO' ? 'text-red-500' : 'text-slate-500'}`}
                      >
                        {law.notableVote}
                      </Text>
                    </Text>
                  </View>
                )}
                {law.coSponsors && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="people-outline" size={12} color="#94a3b8" />
                    <Text className="text-[12px] text-slate-400">
                      {law.coSponsors} Co-Sponsors
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

// ── Cases ─────────────────────────────────────────────────────────────────────
function CasesTab({cases}: {cases: CaseEntry[]}) {
  if (!cases || cases.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-16 h-16 rounded-full bg-emerald-50 items-center justify-center mb-3">
          <Ionicons name="shield-checkmark-outline" size={32} color="#10b981" />
        </View>
        <Text className="text-[16px] font-bold text-slate-700 text-center">
          Clean Record
        </Text>
        <Text className="text-[13px] text-slate-400 text-center mt-1 leading-relaxed">
          No cases, COA flags, or accountability issues on record.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {cases.map((c, i) => {
        const flagStyle = FLAG_COLORS[c.flagCategory] ?? {
          bg: '#f3f4f6',
          text: '#374151'
        };
        const statusBadge = CASE_STATUS_BADGE[c.status] ?? {
          bg: '#f3f4f6',
          text: '#374151'
        };
        return (
          <View
            key={i}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100"
          >
            {/* Type + date */}
            <View className="flex-row items-center justify-between mb-2">
              <View
                className="px-2.5 py-0.5 rounded-full"
                style={{backgroundColor: flagStyle.bg}}
              >
                <Text
                  className="text-[10px] font-bold uppercase tracking-wide"
                  style={{color: flagStyle.text}}
                >
                  {c.type}
                </Text>
              </View>
              <Text className="text-[11px] text-slate-400">{c.date}</Text>
            </View>

            {/* Title */}
            <Text className="text-[15px] font-bold text-slate-800 leading-snug mb-2">
              {c.title}
            </Text>
            <Text className="text-[13px] text-slate-500 leading-relaxed mb-3">
              {c.description}
            </Text>

            {/* Flag category */}
            <View
              className="self-start px-2.5 py-1 rounded-full mb-3"
              style={{backgroundColor: flagStyle.bg}}
            >
              <Text
                className="text-[11px] font-bold"
                style={{color: flagStyle.text}}
              >
                {c.flagCategory}
              </Text>
            </View>

            {/* Status + Sources */}
            <View className="flex-row items-center justify-between border-t border-slate-100 pt-3">
              <View
                className="px-2.5 py-1 rounded-full"
                style={{backgroundColor: statusBadge.bg}}
              >
                <Text
                  className="text-[11px] font-semibold"
                  style={{color: statusBadge.text}}
                >
                  {c.status}
                </Text>
              </View>
              <View className="flex-row gap-2">
                {c.sources.map((src, si) => (
                  <View key={si} className="bg-slate-100 px-2 py-0.5 rounded">
                    <Text className="text-[10px] font-semibold text-slate-500 uppercase">
                      {src.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

// ── Family ────────────────────────────────────────────────────────────────────
function FamilyTab({politicianId}: {politicianId: string}) {
  const lcf = getLCFById(politicianId);
  if (!lcf)
    return (
      <EmptyState icon="people-outline" message="No family data available." />
    );
  const {family} = lcf;

  if (!family.hasDynasty) {
    return (
      <View
        className="flex-1 px-4"
        style={{paddingTop: 24, paddingBottom: 100}}
      >
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 items-center">
          <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-3">
            <Ionicons name="people-outline" size={30} color="#94a3b8" />
          </View>
          <Text className="text-[15px] font-bold text-slate-700 mb-1">
            No Political Dynasty
          </Text>
          <Text className="text-[13px] text-slate-400 text-center leading-relaxed">
            {family.dynastyNote}
          </Text>
          {/* Non-political family members */}
          {family.members.length > 0 && (
            <View className="w-full mt-4 pt-4 border-t border-slate-100">
              <Text className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Family Members
              </Text>
              {family.members.map((m, i) => (
                <View key={i} className="flex-row items-center py-2">
                  <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center mr-3">
                    <Ionicons name="person-outline" size={15} color="#94a3b8" />
                  </View>
                  <View>
                    <Text className="text-[13px] font-semibold text-slate-700">
                      {m.name}
                    </Text>
                    <Text className="text-[11px] text-slate-400 capitalize">
                      {m.role.toLowerCase()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }

  // Has dynasty
  const parents = family.members.filter(
    m =>
      m.role === 'PATRIARCH' ||
      m.role === 'MATRIARCH' ||
      m.role === 'SPOUSE' ||
      m.role === 'PARENT'
  );
  const siblings = family.members.filter(m => m.role === 'SIBLING');
  const members = family.members.filter(m => m.role === 'MEMBER');

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {/* Dynasty note */}
      <View className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex-row">
        <Ionicons
          name="warning-outline"
          size={16}
          color="#d97706"
          style={{marginTop: 1, marginRight: 8}}
        />
        <Text className="flex-1 text-[13px] text-amber-800 leading-relaxed">
          {family.dynastyNote}
        </Text>
      </View>

      {/* Spouse / parent */}
      {parents.map((m, i) => (
        <FamilyMemberCard key={`parent-${i}`} member={m} accent="#1e293b" />
      ))}

      {/* Political relatives */}
      {[...siblings, ...members]
        .filter(m => m.position)
        .map((m, i) => (
          <FamilyMemberCard
            key={`member-${i}`}
            member={m}
            accent="#ef4444"
            isPolitical
          />
        ))}

      {/* Non-political members */}
      {members
        .filter(m => !m.position)
        .map((m, i) => (
          <FamilyMemberCard key={`np-${i}`} member={m} accent="#94a3b8" />
        ))}
    </ScrollView>
  );
}

function FamilyMemberCard({
  member,
  accent,
  isPolitical = false
}: {
  member: FamilyMember;
  accent: string;
  isPolitical?: boolean;
}) {
  const initials = member.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-slate-100 flex-row items-center">
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{backgroundColor: accent + '20'}}
      >
        <Text className="font-bold text-[14px]" style={{color: accent}}>
          {initials}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-[14px] font-bold text-slate-800">
          {member.name}
        </Text>
        <Text className="text-[12px] text-slate-400 capitalize mt-0.5">
          {member.role.toLowerCase().replace('_', ' ')}
        </Text>
        {member.position && (
          <View className="flex-row items-center mt-1.5">
            <View className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5" />
            <Text className="text-[12px] text-red-600 font-medium">
              {member.position}
            </Text>
          </View>
        )}
      </View>
      {isPolitical && (
        <View className="bg-red-50 px-2 py-0.5 rounded-full">
          <Text className="text-[10px] font-bold text-red-500 uppercase">
            Political
          </Text>
        </View>
      )}
    </View>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({icon, message}: {icon: string; message: string}) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Ionicons name={icon as any} size={40} color="#cbd5e1" />
      <Text className="text-slate-400 mt-3 text-[14px] text-center">
        {message}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PROFILE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function PoliticianProfile() {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Experience');
  const scrollY = useRef(new Animated.Value(0)).current;

  const politician = getById(id);
  const lcf = getLCFById(id);
  const ext = getExtendedById(id);

  if (!politician) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-slate-400">Politician not found.</Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-blue-500">Go back</Text>
        </Pressable>
      </View>
    );
  }

  const accent = POSITION_ACCENT[politician.position] ?? '#3b82f6';
  const partyLabel = PARTIES[politician.party];
  const initials = `${politician.firstName[0]}${politician.lastName[0]}`;
  const flagStatus = politician.accountabilityFlags.status;
  const flagCount = politician.accountabilityFlags.count;

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" />

      {/* ── Cover + header ── */}
      <View
        style={{backgroundColor: '#1e293b', paddingTop: 52, paddingBottom: 0}}
      >
        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-14 left-4 w-8 h-8 rounded-full bg-white/20 items-center justify-center z-10"
        >
          <Ionicons name="chevron-back" size={18} color="white" />
        </Pressable>

        {/* Avatar + name block */}
        <View className="items-center px-5 pb-5">
          {/* Avatar */}
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-3 border-4 border-white/20"
            style={{backgroundColor: accent + '40'}}
          >
            {politician.profileSrc ? (
              <Image
                source={politician.profileSrc}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Text className="text-white font-bold text-3xl">{initials}</Text>
            )}
          </View>

          {/* Name */}
          <Text className="text-white text-[22px] font-bold text-center leading-tight">
            {politician.honorific} {politician.fullName}
          </Text>
          <View className="flex-row items-center mt-1.5 gap-2">
            <View
              className="px-2.5 py-0.5 rounded-full"
              style={{backgroundColor: accent + '30'}}
            >
              <Text
                className="text-[12px] font-semibold"
                style={{color: accent}}
              >
                {politician.position}
              </Text>
            </View>
            <Text className="text-slate-400 text-[12px]">
              {politician.region}
            </Text>
          </View>

          {/* Net worth + party row */}
          <View className="flex-row items-center mt-3 gap-4">
            <View className="flex-row items-center gap-1">
              <Ionicons name="wallet-outline" size={12} color="#94a3b8" />
              <Text className="text-slate-400 text-[12px]">
                Net Worth:{' '}
                <Text className="text-white font-semibold">
                  {politician.netWorthLabel}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="flag-outline" size={12} color="#94a3b8" />
              <Text className="text-slate-400 text-[12px]">
                <Text className="text-white font-semibold">{partyLabel}</Text>
              </Text>
            </View>
          </View>

          {/* Flag pill */}
          {flagStatus !== 'clear' && (
            <View
              className="flex-row items-center mt-3 px-3 py-1 rounded-full"
              style={{
                backgroundColor:
                  flagStatus === 'pending' ? '#fee2e2' : '#fef9c3'
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={13}
                color={flagStatus === 'pending' ? '#b91c1c' : '#854d0e'}
              />
              <Text
                className="text-[11px] font-bold ml-1"
                style={{
                  color: flagStatus === 'pending' ? '#b91c1c' : '#854d0e'
                }}
              >
                {flagCount} Accountability Flag{flagCount !== 1 ? 's' : ''} ·{' '}
                {flagStatus.toUpperCase()}
              </Text>
            </View>
          )}

          {/* Action buttons */}
          <View className="flex-row gap-3 mt-4">
            <Pressable className="flex-1 flex-row items-center justify-center bg-white/10 rounded-xl py-2.5 gap-2">
              <Ionicons name="bookmark-outline" size={15} color="white" />
              <Text className="text-white text-[13px] font-medium">
                Follow Activity
              </Text>
            </Pressable>
            <Pressable className="w-11 h-11 items-center justify-center bg-white/10 rounded-xl">
              <Ionicons name="share-outline" size={17} color="white" />
            </Pressable>
            <Pressable className="w-11 h-11 items-center justify-center bg-white/10 rounded-xl">
              <Ionicons name="download-outline" size={17} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Tab bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-t border-white/10"
          contentContainerStyle={{paddingHorizontal: 8}}
        >
          {TABS.map(tab => {
            const active = activeTab === tab;
            // Cases tab shows badge if flags exist
            const showBadge = tab === 'Cases' && flagCount > 0;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                className="px-4 py-3 relative"
              >
                <View className="flex-row items-center gap-1.5">
                  <Text
                    className={`text-[14px] font-semibold ${active ? 'text-white' : 'text-slate-400'}`}
                  >
                    {tab}
                  </Text>
                  {showBadge && (
                    <View className="w-4 h-4 rounded-full bg-red-500 items-center justify-center">
                      <Text className="text-white text-[9px] font-bold">
                        {flagCount}
                      </Text>
                    </View>
                  )}
                </View>
                {active && (
                  <View
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{backgroundColor: accent}}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Tab content ── */}
      <View className="flex-1">
        {activeTab === 'Experience' && (
          <ExperienceTab entries={ext?.experience ?? []} />
        )}
        {activeTab === 'Records' && <RecordsTab politicianId={id} />}
        {activeTab === 'Laws' && <LawsTab laws={lcf?.laws ?? []} />}
        {activeTab === 'Cases' && <CasesTab cases={lcf?.cases ?? []} />}
        {activeTab === 'Family' && <FamilyTab politicianId={id} />}
      </View>
    </View>
  );
}
