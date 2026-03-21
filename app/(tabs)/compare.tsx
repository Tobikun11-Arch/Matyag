import React from 'react';
import {ScrollView, View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react-native';

// ── Types ────────────────────────────────────────────────────────────────────
interface Candidate {
  name: string;
  title: string;
  termYears: number;
  billsAuthored: number;
  attendanceRate: number;
  declaredAssets: string;
  assetYear: string;
  accountabilityFlags: {count: number; status: 'pending' | 'clear'};
}

// ── Mock Data ────────────────────────────────────────────────────────────────
const CANDIDATE_A: Candidate = {
  name: 'Juan Dela Cruz',
  title: 'Senator',
  termYears: 12,
  billsAuthored: 142,
  attendanceRate: 94,
  declaredAssets: '₱45.2M',
  assetYear: '2023 Filing',
  accountabilityFlags: {count: 2, status: 'pending'}
};

const CANDIDATE_B: Candidate = {
  name: 'Maria Clara',
  title: 'Senator',
  termYears: 6,
  billsAuthored: 89,
  attendanceRate: 98,
  declaredAssets: '₱12.8M',
  assetYear: '2023 Filing',
  accountabilityFlags: {count: 0, status: 'clear'}
};

// ── Sub-components ───────────────────────────────────────────────────────────

function AvatarPlaceholder({side}: {side: 'left' | 'right'}) {
  return (
    <View
      className="rounded-full bg-gray-200 border-2 border-white items-center justify-center"
      style={{width: 72, height: 72}}
    />
  );
}

function CandidateHeader({a, b}: {a: Candidate; b: Candidate}) {
  return (
    <View
      className="mx-4 mt-4 rounded-3xl overflow-hidden"
      style={{backgroundColor: '#1A1F36'}}
    >
      {/* gradient-ish top band */}
      <View className="px-6 pt-6 pb-8">
        <View className="flex-row items-center justify-between">
          {/* Left candidate */}
          <View className="items-center flex-1">
            <View className="relative">
              <AvatarPlaceholder side="left" />
              <View
                className="absolute -bottom-2 -right-2 rounded-full items-center justify-center"
                style={{backgroundColor: '#F59E0B', width: 22, height: 22}}
              >
                <Text style={{color: '#fff', fontSize: 10, fontWeight: '700'}}>
                  A
                </Text>
              </View>
            </View>
            <Text className="text-white text-xs mt-3 opacity-60">
              {a.title}
            </Text>
            <Text className="text-white text-sm font-bold text-center mt-0.5">
              {a.name}
            </Text>
          </View>

          {/* VS badge */}
          <View
            className="rounded-full items-center justify-center mx-3"
            style={{backgroundColor: '#F59E0B', width: 36, height: 36}}
          >
            <Text style={{color: '#1A1F36', fontSize: 11, fontWeight: '800'}}>
              VS
            </Text>
          </View>

          {/* Right candidate */}
          <View className="items-center flex-1">
            <View className="relative">
              <AvatarPlaceholder side="right" />
              <View
                className="absolute -bottom-2 -right-2 rounded-full items-center justify-center"
                style={{backgroundColor: '#6366F1', width: 22, height: 22}}
              >
                <Text style={{color: '#fff', fontSize: 10, fontWeight: '700'}}>
                  B
                </Text>
              </View>
            </View>
            <Text className="text-white text-xs mt-3 opacity-60">
              {b.title}
            </Text>
            <Text className="text-white text-sm font-bold text-center mt-0.5">
              {b.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SectionLabel({label}: {label: string}) {
  return (
    <Text
      className="text-center text-xs font-semibold tracking-widest uppercase mb-3"
      style={{color: '#9CA3AF'}}
    >
      {label}
    </Text>
  );
}

function StatRow({
  label,
  left,
  right,
  leftSub,
  rightSub,
  leftHighlight
}: {
  label: string;
  left: string;
  right: string;
  leftSub?: string;
  rightSub?: string;
  leftHighlight?: boolean;
}) {
  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-2xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 2
      }}
    >
      <SectionLabel label={label} />
      <View className="flex-row justify-between items-end">
        <View className="flex-1 items-start">
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: leftHighlight ? '#1A1F36' : '#1A1F36'
            }}
          >
            {left}
          </Text>
          {leftSub && (
            <Text className="text-xs mt-0.5" style={{color: '#9CA3AF'}}>
              {leftSub}
            </Text>
          )}
        </View>
        <View className="flex-1 items-end">
          <Text style={{fontSize: 28, fontWeight: '800', color: '#1A1F36'}}>
            {right}
          </Text>
          {rightSub && (
            <Text
              className="text-xs mt-0.5 text-right"
              style={{color: '#9CA3AF'}}
            >
              {rightSub}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

function AttendanceRow({a, b}: {a: Candidate; b: Candidate}) {
  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-2xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 2
      }}
    >
      <SectionLabel label="Attendance Rate" />
      <View className="flex-row justify-between items-end mb-3">
        <Text style={{fontSize: 28, fontWeight: '800', color: '#1A1F36'}}>
          {a.attendanceRate}%
        </Text>
        <Text style={{fontSize: 28, fontWeight: '800', color: '#1A1F36'}}>
          {b.attendanceRate}%
        </Text>
      </View>
      {/* Progress bars */}
      <View className="flex-row gap-3">
        <View className="flex-1 h-2 rounded-full bg-gray-100">
          <View
            className="h-2 rounded-full"
            style={{width: `${a.attendanceRate}%`, backgroundColor: '#1A1F36'}}
          />
        </View>
        <View className="flex-1 h-2 rounded-full bg-gray-100">
          <View
            className="h-2 rounded-full"
            style={{width: `${b.attendanceRate}%`, backgroundColor: '#6366F1'}}
          />
        </View>
      </View>
    </View>
  );
}

function AccountabilityRow({a, b}: {a: Candidate; b: Candidate}) {
  const FlagBadge = ({cand}: {cand: Candidate}) => {
    const isPending = cand.accountabilityFlags.status === 'pending';
    return (
      <View
        className="flex-row items-center px-3 py-1.5 rounded-full gap-1.5"
        style={{backgroundColor: isPending ? '#FEF3C7' : '#ECFDF5'}}
      >
        {isPending ? (
          <AlertTriangle size={13} color="#D97706" />
        ) : (
          <CheckCircle size={13} color="#10B981" />
        )}
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: isPending ? '#D97706' : '#10B981'
          }}
        >
          {isPending ? `${cand.accountabilityFlags.count} Pending` : 'Clear'}
        </Text>
      </View>
    );
  };

  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-2xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 2
      }}
    >
      <SectionLabel label="Accountability Flags" />
      <View className="flex-row justify-between items-center">
        <FlagBadge cand={a} />
        <FlagBadge cand={b} />
      </View>
    </View>
  );
}

function QuickInsight({a, b}: {a: Candidate; b: Candidate}) {
  return (
    <View
      className="mx-4 mb-4 rounded-2xl px-5 py-4"
      style={{backgroundColor: '#1A1F36'}}
    >
      <View className="flex-row items-center gap-2 mb-2">
        <Zap size={14} color="#F59E0B" fill="#F59E0B" />
        <Text
          style={{
            color: '#F59E0B',
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 1.5
          }}
        >
          QUICK INSIGHT
        </Text>
      </View>
      <Text style={{color: '#E5E7EB', fontSize: 13, lineHeight: 20}}>
        <Text style={{color: '#fff', fontWeight: '700'}}>{a.name}</Text> has 2×
        the legislative output, but{' '}
        <Text style={{color: '#fff', fontWeight: '700'}}>{b.name}</Text>{' '}
        maintains a near-perfect attendance record and has zero accountability
        flags.
      </Text>

      <View className="flex-row gap-3 mt-4">
        <Pressable
          className="flex-1 items-center py-2.5 rounded-xl"
          style={{backgroundColor: '#2D3452'}}
        >
          <Text style={{color: '#E5E7EB', fontSize: 13, fontWeight: '600'}}>
            View Full Dossier
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center py-2.5 rounded-xl"
          style={{backgroundColor: '#F59E0B'}}
        >
          <Text style={{color: '#1A1F36', fontSize: 13, fontWeight: '700'}}>
            Download Report
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function CompareScreen() {
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: '#F3F4F8'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 75}}
      >
        <CandidateHeader a={CANDIDATE_A} b={CANDIDATE_B} />

        {/* Gap */}
        <View className="h-4" />

        <StatRow
          label="Term in Office"
          left={`${CANDIDATE_A.termYears} Years`}
          right={`${CANDIDATE_B.termYears} Years`}
        />

        <StatRow
          label="Bills Authored"
          left={`${CANDIDATE_A.billsAuthored}`}
          right={`${CANDIDATE_B.billsAuthored}`}
        />

        <AttendanceRow a={CANDIDATE_A} b={CANDIDATE_B} />

        <StatRow
          label="Declared Assets (SALN)"
          left={CANDIDATE_A.declaredAssets}
          right={CANDIDATE_B.declaredAssets}
          leftSub={CANDIDATE_A.assetYear}
          rightSub={CANDIDATE_B.assetYear}
        />

        <AccountabilityRow a={CANDIDATE_A} b={CANDIDATE_B} />

        <QuickInsight a={CANDIDATE_A} b={CANDIDATE_B} />
      </ScrollView>
    </SafeAreaView>
  );
}
