import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
  Animated,
  Modal,
  Share
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

import {
  getById,
  getExtendedById,
  type ExperienceEntry,
  getLCFById,
  type LawEntry,
  type CaseEntry,
  type FamilyMember
} from '@/constants/dataset';
import {useBallot, BALLOT_LIMITS} from '@/hooks/BallotContext';

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

const TABS = ['Experience', 'Records', 'Laws', 'Cases', 'Family'] as const;
type Tab = (typeof TABS)[number];

// ─── Name → local image map ───────────────────────────────────────────────────
// Key = first name as it appears in the family member's name string in the dataset
const POLITICIAN_IMAGES: Record<string, number> = {
  // Presidents
  Ricardo: require('@/assets/images/president/Ricardo.png'),
  Esperanza: require('@/assets/images/president/Esperanza.png'),
  Lorenzo: require('@/assets/images/president/Lorenzo.png'),
  Aurelio: require('@/assets/images/president/Aurelio.png'),
  // Senators
  Andres: require('@/assets/images/senators/Andres.png'),
  Soledad: require('@/assets/images/senators/Soledad.png'),
  Bonifacio: require('@/assets/images/senators/Bonifacio.png')
};

function getMemberImage(name: string): number | null {
  const match = Object.keys(POLITICIAN_IMAGES).find(key => name.includes(key));
  return match ? POLITICIAN_IMAGES[match] : null;
}

// ─── News source logo map ─────────────────────────────────────────────────────
const SOURCE_LOGOS: Record<string, string> = {
  pcij: 'https://www.google.com/s2/favicons?domain=pcij.org&sz=64',
  rappler: 'https://www.google.com/s2/favicons?domain=rappler.com&sz=64',
  inquirer: 'https://www.google.com/s2/favicons?domain=inquirer.net&sz=64',
  gma: 'https://www.google.com/s2/favicons?domain=gmanetwork.com&sz=64',
  abscbn: 'https://www.google.com/s2/favicons?domain=news.abs-cbn.com&sz=64',
  philstar: 'https://www.google.com/s2/favicons?domain=philstar.com&sz=64',
  manilatimes:
    'https://www.google.com/s2/favicons?domain=manilatimes.net&sz=64',
  businessworld:
    'https://www.google.com/s2/favicons?domain=businessworld.com.ph&sz=64'
};

// ─── Ballot Modal ─────────────────────────────────────────────────────────────
interface BallotModalConfig {
  visible: boolean;
  type: 'added' | 'remove' | 'full' | 'already';
  title: string;
  message: string;
  onConfirm?: () => void;
}

function BallotModal({
  config,
  onClose
}: {
  config: BallotModalConfig;
  onClose: () => void;
}) {
  const isDestructive = config.type === 'remove';
  const iconName =
    config.type === 'added'
      ? 'checkmark-circle'
      : config.type === 'remove'
      ? 'trash-outline'
      : config.type === 'full'
      ? 'alert-circle'
      : 'information-circle';
  const iconColor =
    config.type === 'added'
      ? '#10b981'
      : config.type === 'remove'
      ? '#ef4444'
      : config.type === 'full'
      ? '#f59e0b'
      : '#3b82f6';

  return (
    <Modal
      visible={config.visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        onPress={onClose}
      >
        <Pressable
          onPress={e => e.stopPropagation()}
          className="bg-white rounded-3xl mx-6 overflow-hidden"
          style={{width: '88%'}}
        >
          <View
            className="items-center pt-8 pb-5 px-6"
            style={{backgroundColor: iconColor + '10'}}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
              style={{backgroundColor: iconColor + '20'}}
            >
              <Ionicons name={iconName as any} size={34} color={iconColor} />
            </View>
            <Text className="text-[18px] font-bold text-slate-800 text-center">
              {config.title}
            </Text>
          </View>
          <View className="px-6 py-4">
            <Text className="text-[14px] text-slate-500 text-center leading-relaxed">
              {config.message}
            </Text>
          </View>
          <View className="px-6 pb-6 gap-3">
            {isDestructive ? (
              <>
                <Pressable
                  onPress={() => {
                    config.onConfirm?.();
                    onClose();
                  }}
                  className="py-3.5 rounded-2xl items-center"
                  style={{backgroundColor: '#ef4444'}}
                >
                  <Text className="text-white font-bold text-[15px]">
                    Remove from Ballot
                  </Text>
                </Pressable>
                <Pressable
                  onPress={onClose}
                  className="py-3.5 rounded-2xl items-center bg-slate-100"
                >
                  <Text className="text-slate-600 font-semibold text-[15px]">
                    Keep
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={onClose}
                className="py-3.5 rounded-2xl items-center"
                style={{backgroundColor: iconColor}}
              >
                <Text className="text-white font-bold text-[15px]">Got it</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ExperienceTab({entries}: {entries: ExperienceEntry[]}) {
  if (!entries || entries.length === 0)
    return (
      <EmptyState
        icon="briefcase-outline"
        message="No experience records available."
      />
    );
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
    >
      {entries.map((entry, i) => (
        <View key={i} className="flex-row mb-6">
          <View className="items-center mr-4" style={{width: 20}}>
            <View className="w-3 h-3 rounded-full bg-[#1e293b] mt-1" />
            {i < entries.length - 1 && (
              <View className="w-0.5 flex-1 bg-slate-200 mt-1" />
            )}
          </View>
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
        {r.attendanceRate > 0 && (
          <View className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-emerald-400 rounded-full"
              style={{width: `${r.attendanceRate}%`}}
            />
          </View>
        )}
      </View>
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

function LawsTab({laws}: {laws: LawEntry[]}) {
  if (!laws || laws.length === 0)
    return (
      <EmptyState
        icon="document-text-outline"
        message="No legislative records available."
      />
    );
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
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View
                  className={`px-2 py-0.5 rounded-md ${
                    law.isRepublicAct ? 'bg-[#1e293b]' : 'bg-slate-100'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      law.isRepublicAct ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {law.billNumber}
                  </Text>
                </View>
                <Text className="text-[11px] text-slate-400">
                  {law.role} · {law.date}
                </Text>
              </View>
            </View>
            <Text className="text-[15px] font-bold text-slate-800 leading-snug mb-1">
              {law.title}
            </Text>
            <Text className="text-[13px] text-slate-500 leading-relaxed mb-3">
              {law.description}
            </Text>
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
            {(law.notableVote || law.coSponsors) && (
              <View className="flex-row items-center gap-4 border-t border-slate-100 pt-3">
                {law.notableVote && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="person-outline" size={12} color="#94a3b8" />
                    <Text className="text-[12px] text-slate-400">
                      Notable Vote:{' '}
                      <Text
                        className={`font-bold ${
                          law.notableVote === 'YES'
                            ? 'text-emerald-600'
                            : law.notableVote === 'NO'
                            ? 'text-red-500'
                            : 'text-slate-500'
                        }`}
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
            <Text className="text-[15px] font-bold text-slate-800 leading-snug mb-2">
              {c.title}
            </Text>
            <Text className="text-[13px] text-slate-500 leading-relaxed mb-3">
              {c.description}
            </Text>
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
            <View className="flex-row items-center justify-between border-t border-slate-100 pt-3">
              <View className="px-2.5 py-1 rounded-full">
                <Text className="text-[11px] font-semibold text-gray-400">
                  Sources
                </Text>
              </View>
              <View className="flex-row gap-2 items-center">
                {c.sources.map((src, si) => (
                  <View
                    key={si}
                    className="w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center overflow-hidden"
                  >
                    <Image
                      source={{uri: SOURCE_LOGOS[src.logo]}}
                      style={{width: 18, height: 18, resizeMode: 'contain'}}
                    />
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

function FamilyTab({politicianId}: {politicianId: string}) {
  const lcf = getLCFById(politicianId);
  const politician = getById(politicianId);

  if (!lcf || !politician)
    return (
      <EmptyState icon="people-outline" message="No family data available." />
    );

  const {family} = lcf;

  if (!family.hasDynasty) {
    return (
      <ScrollView
        className="flex-1"
        contentContainerStyle={{padding: 16, paddingBottom: 100}}
      >
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 items-center">
          <View className="w-14 h-14 rounded-full bg-slate-100 items-center justify-center mb-3">
            <Ionicons name="people-outline" size={26} color="#94a3b8" />
          </View>
          <Text className="text-[15px] font-bold text-slate-700 mb-1 text-center">
            No Political Dynasty
          </Text>
          <Text className="text-[13px] text-slate-400 text-center leading-relaxed">
            {family.dynastyNote}
          </Text>
        </View>
      </ScrollView>
    );
  }

  const politicalMembers = family.members.filter(m => m.position);

  const SUBJECT_SIZE = 64;
  const NODE_SIZE = 54;
  const NODE_WIDTH = 96;
  const GAP = 16;

  const subjectInitials = `${politician.firstName?.[0] ?? ''}${
    politician.lastName?.[0] ?? ''
  }`;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join('');

  const hLineWidth =
    politicalMembers.length > 1
      ? (politicalMembers.length - 1) * (NODE_WIDTH + GAP)
      : 0;

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{padding: 16, paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
    >
      {/* Dynasty warning */}
      <View
        style={{
          backgroundColor: '#fef3c7',
          borderWidth: 1,
          borderColor: '#fde68a',
          borderRadius: 16,
          padding: 12,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}
      >
        <Ionicons
          name="warning-outline"
          size={14}
          color="#d97706"
          style={{marginTop: 1, marginRight: 8, flexShrink: 0}}
        />
        <Text style={{flex: 1, fontSize: 12, color: '#92400e', lineHeight: 18}}>
          {family.dynastyNote}
        </Text>
      </View>

      {/* Tree card */}
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#f1f5f9',
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: {width: 0, height: 2},
          elevation: 2,
          padding: 24,
          alignItems: 'center'
        }}
      >
        {/* Subject node */}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: 99,
              paddingHorizontal: 10,
              paddingVertical: 3,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#e2e8f0'
            }}
          >
            <Text
              style={{
                fontSize: 9,
                fontWeight: '800',
                color: '#475569',
                letterSpacing: 1,
                textTransform: 'uppercase'
              }}
            >
              This Politician
            </Text>
          </View>

          <View
            style={{
              width: SUBJECT_SIZE,
              height: SUBJECT_SIZE,
              borderRadius: SUBJECT_SIZE / 2,
              backgroundColor: '#1e293b',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: 'white',
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 8,
              shadowOffset: {width: 0, height: 3},
              elevation: 5
            }}
          >
            {politician.profileSrc ? (
              <Image
                source={politician.profileSrc}
                style={{
                  width: SUBJECT_SIZE,
                  height: SUBJECT_SIZE + 16,
                  resizeMode: 'cover',
                  marginBottom: -16
                }}
              />
            ) : (
              <Text style={{color: 'white', fontWeight: '800', fontSize: 20}}>
                {subjectInitials}
              </Text>
            )}
          </View>

          <Text
            numberOfLines={2}
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: '#1e293b',
              textAlign: 'center',
              marginTop: 6,
              width: 110,
              lineHeight: 15
            }}
          >
            {politician.honorific} {politician.fullName}
          </Text>
          <Text style={{fontSize: 9, color: '#94a3b8', marginTop: 2}}>
            {politician.position}
          </Text>
        </View>

        {/* Connectors + relative nodes */}
        {politicalMembers.length > 0 && (
          <>
            <View style={{width: 2, height: 28, backgroundColor: '#cbd5e1'}} />

            {politicalMembers.length > 1 && (
              <View
                style={{
                  width: hLineWidth,
                  height: 2,
                  backgroundColor: '#cbd5e1'
                }}
              />
            )}

            <View style={{flexDirection: 'row', gap: GAP}}>
              {politicalMembers.map((_, i) => (
                <View key={i} style={{width: NODE_WIDTH, alignItems: 'center'}}>
                  <View
                    style={{width: 2, height: 16, backgroundColor: '#cbd5e1'}}
                  />
                </View>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: GAP,
                alignItems: 'flex-start',
                marginTop: -1
              }}
            >
              {politicalMembers.map((m, i) => {
                const linkedPolitician = m.currentPoliticianId
                  ? getById(m.currentPoliticianId)
                  : null;
                const memberImg =
                  linkedPolitician?.profileSrc ?? getMemberImage(m.name);

                return (
                  <View
                    key={i}
                    style={{width: NODE_WIDTH, alignItems: 'center'}}
                  >
                    <View
                      style={{
                        width: NODE_SIZE,
                        height: NODE_SIZE,
                        borderRadius: NODE_SIZE / 2,
                        backgroundColor: '#ef4444',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 3,
                        borderColor: 'white',
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        shadowOffset: {width: 0, height: 2},
                        elevation: 3
                      }}
                    >
                      {memberImg ? (
                        <Image
                          source={memberImg}
                          style={{
                            width: NODE_SIZE,
                            height: NODE_SIZE + 12,
                            resizeMode: 'cover',
                            marginBottom: -12
                          }}
                        />
                      ) : (
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 15
                          }}
                        >
                          {getInitials(m.name)}
                        </Text>
                      )}
                    </View>

                    <Text
                      numberOfLines={3}
                      style={{
                        fontSize: 9,
                        fontWeight: '700',
                        color: '#1e293b',
                        textAlign: 'center',
                        marginTop: 6,
                        width: NODE_WIDTH,
                        lineHeight: 13
                      }}
                    >
                      {m.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: '#94a3b8',
                        textAlign: 'center',
                        marginTop: 2,
                        textTransform: 'capitalize'
                      }}
                    >
                      {m.role.toLowerCase().replace('_', ' ')}
                    </Text>

                    {m.position && (
                      <View
                        style={{
                          marginTop: 4,
                          backgroundColor: '#fee2e2',
                          borderRadius: 99,
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                          maxWidth: NODE_WIDTH
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 8,
                            fontWeight: '700',
                            color: '#b91c1c',
                            textAlign: 'center'
                          }}
                        >
                          {m.position}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Legend */}
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            marginTop: 28,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            alignSelf: 'stretch',
            justifyContent: 'center'
          }}
        >
          {[
            {color: '#1e293b', label: 'This Politician'},
            {color: '#ef4444', label: 'Political Relative'}
          ].map(l => (
            <View
              key={l.label}
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: l.color
                }}
              />
              <Text style={{fontSize: 10, color: '#94a3b8'}}>{l.label}</Text>
            </View>
          ))}
        </View>
      </View>
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalConfig, setModalConfig] = useState<BallotModalConfig>({
    visible: false,
    type: 'added',
    title: '',
    message: ''
  });
  const scrollY = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [tabPositions, setTabPositions] = useState<Record<string, number>>({});

  const {isOnBallot, addToBallot, removeFromBallot} = useBallot();

  const politician = getById(id);
  const lcf = getLCFById(id);
  const ext = getExtendedById(id);

  const closeModal = () => setModalConfig(p => ({...p, visible: false}));

  const handleTabPress = (tab: Tab) => {
    const targetX = tabPositions[tab] ?? 0;
    Animated.spring(slideAnim, {
      toValue: targetX,
      useNativeDriver: true,
      tension: 120,
      friction: 14
    }).start();
    setActiveTab(tab);
  };

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
  const initials = `${politician.firstName[0]}${politician.lastName[0]}`;
  const flagStatus = politician.accountabilityFlags.status;
  const flagCount = politician.accountabilityFlags.count;
  const onBallot = isOnBallot(politician.id);

  const handleBallotPress = () => {
    if (onBallot) {
      setModalConfig({
        visible: true,
        type: 'remove',
        title: 'Remove from Ballot?',
        message: `${politician.fullName} will be removed from your ${politician.position} slot.`,
        onConfirm: () => removeFromBallot(politician.id)
      });
      return;
    }

    const result = addToBallot({
      id: politician.id,
      position: politician.position,
      fullName: politician.fullName,
      honorific: politician.honorific,
      party: politician.party,
      region: politician.region,
      profileSrc: politician.profileSrc,
      netWorthLabel: politician.netWorthLabel,
      addedAt: Date.now()
    });

    if (result === 'added') {
      setModalConfig({
        visible: true,
        type: 'added',
        title: 'Added to Ballot!',
        message: `${politician.fullName} has been added to your ${politician.position} slot.`
      });
    } else if (result === 'slot_full') {
      const limit = BALLOT_LIMITS[politician.position];
      setModalConfig({
        visible: true,
        type: 'full',
        title: 'Slot Full',
        message: `You already have ${limit} ${politician.position}${
          limit > 1 ? 's' : ''
        } on your ballot. Go to your ballot and remove one first.`
      });
    } else {
      setModalConfig({
        visible: true,
        type: 'already',
        title: 'Already Added',
        message: `${politician.fullName} is already on your ballot.`
      });
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `${politician.honorific} ${politician.fullName}`,
        message: `Check out ${politician.honorific} ${politician.fullName} — ${politician.position} (${politician.party}, ${politician.region}). Net Worth: ${politician.netWorthLabel}.`
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" />

      {/* Ballot Modal */}
      <BallotModal config={modalConfig} onClose={closeModal} />

      {/* Cover + header */}
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

        {/* Profile info */}
        <View className="items-center gap-2 px-5 pb-6">
          {/* Avatar */}
          <View
            className="w-24 h-24 rounded-full mt-5 overflow-hidden border-2 border-white/20"
            style={{backgroundColor: accent + '40'}}
          >
            {politician.profileSrc ? (
              <Image
                source={politician.profileSrc}
                style={{
                  width: 88,
                  height: 120,
                  resizeMode: 'cover',
                  marginBottom: -32
                }}
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Text className="text-white font-bold text-3xl">
                  {initials}
                </Text>
              </View>
            )}
          </View>

          {/* Name */}
          <Text className="text-white text-[22px] font-bold text-center leading-tight mt-4">
            {politician.honorific} {politician.fullName}
          </Text>

          {/* Position + region */}
          <View className="flex-row items-center mt-2 gap-2">
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

          {/* Net worth + party */}
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
              <Text className="text-white font-semibold text-[12px]">
                {politician.party}
              </Text>
            </View>
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-3 mt-4 w-full">
            <Pressable
              onPress={() => setIsFollowing(prev => !prev)}
              className="flex-1 flex-row items-center justify-center rounded-xl py-2.5 gap-2"
              style={{
                backgroundColor: isFollowing
                  ? '#10b981'
                  : 'rgba(255,255,255,0.1)'
              }}
            >
              <Ionicons
                name={isFollowing ? 'checkmark-circle' : 'bookmark-outline'}
                size={15}
                color="white"
              />
              <Text className="text-white text-[13px] font-medium">
                {isFollowing ? 'Following' : 'Follow Activity'}
              </Text>
            </Pressable>
            <Pressable className="w-11 h-11 items-center justify-center bg-white/10 rounded-xl">
              <Ionicons name="share-outline" size={17} color="white" onPress={handleShare} />
            </Pressable>
            <Pressable
              onPress={handleBallotPress}
              className="w-11 h-11 items-center justify-center rounded-xl"
              style={{
                backgroundColor: onBallot ? '#10b981' : 'rgba(255,255,255,0.1)'
              }}
            >
              <Ionicons
                name={onBallot ? 'checkmark' : 'download-outline'}
                size={17}
                color="white"
              />
            </Pressable>
          </View>
        </View>

        {/* Tab bar */}
        <View className="bg-white px-4 pb-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 0}}
          >
            <View
              className="flex-row items-center rounded-full mt-4"
              style={{backgroundColor: '#EDEDFA', padding: 6}}
            >
              {tabWidths[activeTab] !== undefined && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#1e293b',
                    borderRadius: 999,
                    width: tabWidths[activeTab],
                    top: 6,
                    bottom: 6,
                    transform: [{translateX: slideAnim}]
                  }}
                />
              )}

              {TABS.map(tab => {
                const active = activeTab === tab;
                const showBadge = tab === 'Cases' && flagCount > 0;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => handleTabPress(tab)}
                    className="px-4 py-2 rounded-full"
                    onLayout={e => {
                      const {width, x} = e.nativeEvent.layout;
                      setTabWidths(prev => ({...prev, [tab]: width}));
                      setTabPositions(prev => ({...prev, [tab]: x}));
                      if (tab === 'Experience' && activeTab === 'Experience') {
                        slideAnim.setValue(x);
                      }
                    }}
                  >
                    <View className="flex-row items-center gap-1.5">
                      <Text
                        className="text-[13px] font-semibold"
                        style={{color: active ? 'white' : '#434656'}}
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
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Tab content */}
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
