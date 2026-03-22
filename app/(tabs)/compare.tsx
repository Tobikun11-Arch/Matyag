import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  Modal,
  FlatList,
  TextInput,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native';
import {Zap, AlertTriangle, CheckCircle, X, Search} from 'lucide-react-native';
import {useRouter} from 'expo-router';
import {useFocusEffect} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {
  allPoliticians,
  type Politician,
  type Position
} from '@/constants/dataset';
import {useTabChrome} from '@/hooks/TabChromeContext';

// ─── Position filter config ───────────────────────────────────────────────────
const POSITION_FILTERS: {label: string; value: Position | 'All'}[] = [
  {label: 'All', value: 'All'},
  {label: 'President', value: 'President'},
  {label: 'Vice President', value: 'Vice President'},
  {label: 'Senator', value: 'Senator'},
  {label: 'Party-list', value: 'Party-list'}
];

const POSITION_COLORS: Record<
  Position,
  {bg: string; text: string; dot: string}
> = {
  President: {bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500'},
  'Vice President': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    dot: 'bg-purple-500'
  },
  Senator: {bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500'},
  'Party-list': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500'
  }
};

const CARD_SURFACE = {
  shadowColor: '#0f172a',
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: {width: 0, height: 3},
  elevation: 2
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PICKER MODAL
// ─────────────────────────────────────────────────────────────────────────────
function PickerModal({
  visible,
  onClose,
  onSelect,
  exclude
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (p: Politician) => void;
  exclude?: string;
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Position | 'All'>('All');

  const filtered = allPoliticians.filter(p => {
    if (p.id === exclude) return false;
    const q = query.toLowerCase();
    const matchesQuery =
      q === '' ||
      p.fullName.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' || p.position === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100">
          <Text className="text-[17px] font-bold text-slate-800">
            Select Politician
          </Text>
          <Pressable
            onPress={onClose}
            className="w-8 h-8 items-center justify-center"
          >
            <X size={20} color="#64748b" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-slate-100 rounded-2xl px-3.5 h-12">
            <Search size={16} color="#94a3b8" />
            <View className="flex-1 ml-2">
              <Text className="text-[14px] text-slate-700" onPress={() => {}} />
              {/* RN TextInput workaround */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
              >
                {React.createElement(TextInput, {
                  className: 'flex-1 text-[14px] text-slate-700',
                  placeholder: 'Search by name...',
                  placeholderTextColor: '#94a3b8',
                  value: query,
                  onChangeText: setQuery
                })}
              </View>
            </View>
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={17} color="#94a3b8" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Position filter chips */}
        <View style={{height: 44}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 mb-2"
            style={{maxHeight: 40, flexGrow: 0}}
            contentContainerStyle={{
              gap: 8,
              paddingRight: 16,
              alignItems: 'center'
            }}
          >
            {POSITION_FILTERS.map(f => {
              const active = filter === f.value;
              return (
                <Pressable
                  key={f.value}
                  onPress={() => setFilter(f.value as Position | 'All')}
                  className={`px-3.5 py-2 rounded-full border ${
                    active
                      ? 'bg-[#1e293b] border-[#1e293b]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-[12px] font-medium ${active ? 'text-white' : 'text-slate-600'}`}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 40}}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-slate-100 mx-5" />
          )}
          renderItem={({item}) => {
            const colors = POSITION_COLORS[item.position];
            const initials = `${item.firstName[0]}${item.lastName[0]}`;
            return (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className="flex-row items-center px-5 py-3.5 active:bg-slate-50"
              >
                <View className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden items-center justify-center mr-3">
                  {item.profileSrc ? (
                    <Image
                      source={item.profileSrc}
                      style={{
                        width: 48, // ← match container exactly
                        height: 68,
                        resizeMode: 'cover',
                        marginBottom: -20
                      }}
                    />
                  ) : (
                    <Text className="text-slate-500 font-bold">{initials}</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[14px] font-semibold text-slate-800"
                    numberOfLines={1}
                  >
                    {item.honorific} {item.fullName}
                  </Text>
                  <View
                    className={`self-start flex-row items-center px-2 py-0.5 rounded-full mt-1 ${colors.bg}`}
                  >
                    <View
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${colors.dot}`}
                    />
                    <Text className={`text-[10px] font-medium ${colors.text}`}>
                      {item.position}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CANDIDATE SLOT
// ─────────────────────────────────────────────────────────────────────────────
function CandidateSlot({
  politician,
  badge,
  badgeColor,
  onPress
}: {
  politician: Politician | null;
  badge: string;
  badgeColor: string;
  onPress: () => void;
}) {
  if (!politician) {
    return (
      <Pressable onPress={onPress} className="flex-1 items-center">
        <View
          className="rounded-full border-2 border-dashed border-slate-500 items-center justify-center"
          style={{width: 72, height: 72}}
        >
          <Ionicons name="add" size={24} color="#94a3b8" />
        </View>
        <Text className="text-slate-400 text-[11px] mt-2 font-medium">Tap to select</Text>
      </Pressable>
    );
  }

  const initials = `${politician.firstName[0]}${politician.lastName[0]}`;

  return (
    <Pressable onPress={onPress} className="flex-1 items-center">
      <View className="relative">
        <View
          className="rounded-full overflow-hidden border-2 border-white"
          style={{width: 72, height: 72, backgroundColor: '#334155'}}
        >
          {politician.profileSrc ? (
            <Image
              source={politician.profileSrc}
              style={{
                width: 72, // ← already correct here
                height: 100,
                resizeMode: 'cover',
                marginBottom: -28
              }}
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Text style={{color: 'white', fontWeight: '700', fontSize: 22}}>
                {initials}
              </Text>
            </View>
          )}
        </View>
        {/* Badge */}
        <View
          className="absolute -bottom-1 -right-1 rounded-full items-center justify-center border-2 border-[#1A1F36]"
          style={{backgroundColor: badgeColor, width: 22, height: 22}}
        >
          <Text style={{color: '#fff', fontSize: 10, fontWeight: '800'}}>
            {badge}
          </Text>
        </View>
      </View>
      <Text className="text-white text-[10px] mt-2 opacity-60">
        {politician.position}
      </Text>
      <Text
        className="text-white text-[12px] font-bold text-center mt-0.5"
        numberOfLines={2}
      >
        {politician.fullName}
      </Text>
    </Pressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT ROWS
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({label}: {label: string}) {
  return (
    <Text className="text-center text-[11px] font-bold tracking-widest uppercase mb-3 text-slate-500">
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
  leftWins,
  rightWins
}: {
  label: string;
  left: string;
  right: string;
  leftSub?: string;
  rightSub?: string;
  leftWins?: boolean;
  rightWins?: boolean;
}) {
  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-3xl bg-white border border-slate-100"
      style={CARD_SURFACE}
    >
      <SectionLabel label={label} />
      <View className="flex-row justify-between items-end">
        <View className="flex-1 items-start">
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',
              color: leftWins ? '#1A1F36' : '#94a3b8'
            }}
          >
            {left}
          </Text>
          {leftSub && (
            <Text className="text-[11px] mt-0.5 text-slate-400">{leftSub}</Text>
          )}
          {leftWins && (
            <View className="mt-1 px-2 py-0.5 rounded-full bg-amber-100">
              <Text className="text-[10px] font-bold text-amber-700">
                HIGHER
              </Text>
            </View>
          )}
        </View>
        <View className="flex-1 items-end">
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',
              color: rightWins ? '#1A1F36' : '#94a3b8'
            }}
          >
            {right}
          </Text>
          {rightSub && (
            <Text className="text-[11px] mt-0.5 text-right text-slate-400">
              {rightSub}
            </Text>
          )}
          {rightWins && (
            <View className="mt-1 px-2 py-0.5 rounded-full bg-indigo-100 self-end">
              <Text className="text-[10px] font-bold text-indigo-700">
                HIGHER
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function AttendanceRow({a, b}: {a: Politician; b: Politician}) {
  const aWins = a.attendanceRate >= b.attendanceRate;
  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-3xl bg-white border border-slate-100"
      style={CARD_SURFACE}
    >
      <SectionLabel label="Attendance Rate" />
      <View className="flex-row justify-between items-end mb-3">
        <Text
          style={{
            fontSize: 26,
            fontWeight: '800',
            color: aWins ? '#1A1F36' : '#94a3b8'
          }}
        >
          {a.attendanceRate}%
        </Text>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '800',
            color: !aWins ? '#1A1F36' : '#94a3b8'
          }}
        >
          {b.attendanceRate}%
        </Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 h-2 rounded-full bg-gray-100">
          <View
            className="h-2 rounded-full"
            style={{width: `${a.attendanceRate}%`, backgroundColor: '#F59E0B'}}
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

function AccountabilityRow({a, b}: {a: Politician; b: Politician}) {
  const [expandedA, setExpandedA] = useState(false);
  const [expandedB, setExpandedB] = useState(false);

  const FlagBadge = ({
    p,
    expanded,
    onToggle
  }: {
    p: Politician;
    expanded: boolean;
    onToggle: () => void;
  }) => {
    const isPending = p.accountabilityFlags.status === 'pending';
    const isDismissed = p.accountabilityFlags.status === 'dismissed';
    const bgColor = isPending ? '#FEF3C7' : isDismissed ? '#FEF9C3' : '#ECFDF5';
    const textColor = isPending
      ? '#D97706'
      : isDismissed
        ? '#854d0e'
        : '#10B981';
    const label = isPending
      ? `${p.accountabilityFlags.count} Pending`
      : isDismissed
        ? 'Dismissed'
        : 'Clear';
    const isClickable = p.accountabilityFlags.count > 0;

    return (
      <Pressable
        onPress={isClickable ? onToggle : undefined}
        className="flex-1"
      >
        <View
          className="flex-row items-center px-3 py-1.5 rounded-full gap-1.5 self-start"
          style={{backgroundColor: bgColor}}
        >
          {isPending ? (
            <AlertTriangle size={13} color={textColor} />
          ) : (
            <CheckCircle size={13} color={textColor} />
          )}
          <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>
            {label}
          </Text>
          {isClickable && (
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={12}
              color={textColor}
            />
          )}
        </View>

        {/* Expanded details */}
        {expanded && p.accountabilityFlags.details.length > 0 && (
          <View className="mt-2 gap-2">
            {p.accountabilityFlags.details.map((detail, i) => (
              <View
                key={i}
                className="rounded-xl p-3"
                style={{backgroundColor: bgColor}}
              >
                <Text style={{fontSize: 11, color: textColor, lineHeight: 16}}>
                  {detail}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-3xl bg-white border border-slate-100"
      style={CARD_SURFACE}
    >
      <SectionLabel label="Accountability Flags" />
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <FlagBadge
            p={a}
            expanded={expandedA}
            onToggle={() => setExpandedA(v => !v)}
          />
        </View>
        <View className="flex-1 items-end">
          <FlagBadge
            p={b}
            expanded={expandedB}
            onToggle={() => setExpandedB(v => !v)}
          />
        </View>
      </View>
    </View>
  );
}

function PlatformRow({a, b}: {a: Politician; b: Politician}) {
  return (
    <View
      className="mx-4 mb-3 px-5 py-4 rounded-3xl bg-white border border-slate-100"
      style={CARD_SURFACE}
    >
      <SectionLabel label="Platform" />
      <View className="flex-row justify-between gap-3">
        <View className="flex-1 gap-2">
          {a.platform.map((item, i) => (
            <View key={i} className="bg-amber-50 px-2 py-1 rounded-lg">
              <Text
                className="text-[11px] font-semibold text-amber-700"
                numberOfLines={1}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-1 gap-2 items-end">
          {b.platform.map((item, i) => (
            <View key={i} className="bg-indigo-50 px-2 py-1 rounded-lg">
              <Text
                className="text-[11px] font-semibold text-indigo-700 text-right"
                numberOfLines={1}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK INSIGHT
// ─────────────────────────────────────────────────────────────────────────────
function QuickInsight({a, b}: {a: Politician; b: Politician}) {
  const router = useRouter();

  // Auto-generate insight
  const aMore = a.billsAuthored > b.billsAuthored;
  const bAttend = b.attendanceRate > a.attendanceRate;
  const bClean =
    b.accountabilityFlags.status === 'clear' &&
    a.accountabilityFlags.status !== 'clear';
  const aClean =
    a.accountabilityFlags.status === 'clear' &&
    b.accountabilityFlags.status !== 'clear';

  let insight = '';
  if (aMore && bAttend) {
    insight = `${a.fullName} has authored more bills, but ${b.fullName} maintains a higher attendance rate.`;
  } else if (bClean) {
    insight = `${b.fullName} has a clean accountability record while ${a.fullName} has ${a.accountabilityFlags.count} pending flag${a.accountabilityFlags.count !== 1 ? 's' : ''}.`;
  } else if (aClean) {
    insight = `${a.fullName} has a clean accountability record while ${b.fullName} has ${b.accountabilityFlags.count} pending flag${b.accountabilityFlags.count !== 1 ? 's' : ''}.`;
  } else if (a.lawsPassed > b.lawsPassed) {
    insight = `${a.fullName} has passed more laws (${a.lawsPassed}) compared to ${b.fullName} (${b.lawsPassed}).`;
  } else {
    insight = `${a.fullName} has ${a.termExperienceYears} years of experience vs ${b.fullName}'s ${b.termExperienceYears} years.`;
  }

  return (
    <View
      className="mx-4 mb-4 rounded-3xl px-5 py-4"
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
        {insight}
      </Text>
      <View className="flex-row gap-3 mt-4">
        <Pressable
          className="flex-1 items-center py-2.5 rounded-xl"
          style={{backgroundColor: '#2D3452'}}
          onPress={() => router.push(`/politician/${a.id}`)}
        >
          <Text
            style={{color: '#E5E7EB', fontSize: 12, fontWeight: '600'}}
            numberOfLines={1}
          >
            View {a.firstName}
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center py-2.5 rounded-xl"
          style={{backgroundColor: '#F59E0B'}}
          onPress={() => router.push(`/politician/${b.id}`)}
        >
          <Text
            style={{color: '#1A1F36', fontSize: 12, fontWeight: '700'}}
            numberOfLines={1}
          >
            View {b.firstName}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY COMPARE STATE
// ─────────────────────────────────────────────────────────────────────────────
function EmptyCompare({
  onSelectA,
  onSelectB
}: {
  onSelectA: () => void;
  onSelectB: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
        <Ionicons name="git-compare-outline" size={32} color="#94a3b8" />
      </View>
      <Text className="text-[17px] font-bold text-slate-700 text-center mb-2">
        Compare Politicians
      </Text>
      <Text className="text-[13px] text-slate-400 text-center leading-relaxed mb-6">
        Select two politicians to compare their records, laws, attendance, and
        accountability side by side.
      </Text>
      <View className="flex-row gap-3 w-full">
        <Pressable
          onPress={onSelectA}
          className="flex-1 py-3.5 rounded-2xl border-2 border-dashed border-amber-300 items-center"
          style={{backgroundColor: '#fffbeb'}}
        >
          <Text className="text-amber-600 font-bold text-[13px]">
            + Candidate A
          </Text>
        </Pressable>
        <Pressable
          onPress={onSelectB}
          className="flex-1 py-3.5 rounded-2xl border-2 border-dashed border-indigo-300 items-center"
          style={{backgroundColor: '#eef2ff'}}
        >
          <Text className="text-indigo-600 font-bold text-[13px]">
            + Candidate B
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function CompareScreen() {
  const {chromeVisible, setChromeVisible} = useTabChrome();
  const [candidateA, setCandidateA] = useState<Politician | null>(null);
  const [candidateB, setCandidateB] = useState<Politician | null>(null);
  const [showPickerA, setShowPickerA] = useState(false);
  const [showPickerB, setShowPickerB] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const lastOffsetY = useRef(0);
  const headerAnim = useRef(new Animated.Value(1)).current;

  const bothSelected = candidateA && candidateB;

  useFocusEffect(
    useCallback(() => {
      setChromeVisible(true);
    }, [setChromeVisible])
  );

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: chromeVisible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [chromeVisible, headerAnim]);

  const onMainScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const delta = currentY - lastOffsetY.current;

      if (currentY <= 0) {
        setChromeVisible(true);
      } else if (delta > 6 && currentY > 40) {
        setChromeVisible(false);
      } else if (delta < -6) {
        setChromeVisible(true);
      }

      lastOffsetY.current = currentY;
    },
    [setChromeVisible]
  );

  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(headerHeight || 160), 0]
  });
  const headerOpacity = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <Animated.View
        onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
        className="bg-white pt-14 pb-5 px-5 border-b border-slate-100 absolute top-0 left-0 right-0 z-20"
        style={{transform: [{translateY: headerTranslateY}], opacity: headerOpacity}}
      >
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-7 h-7 rounded items-center justify-center">
            <Image
              source={require('../../assets/images/Matyag-no-bg-no-text.png')}
              style={{width: 54, height: 54, resizeMode: 'contain'}}
            />
          </View>
          <Text className="text-[31px] pl-2 font-black text-slate-800 tracking-tight">
            Matyag
          </Text>
        </View>
        <Text className="text-[14px] text-slate-600">
          Select two politicians to compare side by side
        </Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onMainScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight + 12, paddingBottom: 110}}
      >
        {/* ── Candidate header ── */}
        <View
          className="mx-4 mt-4 rounded-3xl overflow-hidden border border-[#27314d]"
          style={{
            backgroundColor: '#1A1F36',
            shadowColor: '#0f172a',
            shadowOpacity: 0.2,
            shadowRadius: 14,
            shadowOffset: {width: 0, height: 6},
            elevation: 4
          }}
        >
          <View className="px-6 pt-6 pb-8">
            <View className="flex-row items-center justify-between">
              <CandidateSlot
                politician={candidateA}
                badge="A"
                badgeColor="#F59E0B"
                onPress={() => setShowPickerA(true)}
              />
              {/* VS badge */}
              <View
                className="rounded-full items-center justify-center mx-3"
                style={{backgroundColor: '#F59E0B', width: 36, height: 36}}
              >
                <Text
                  style={{color: '#1A1F36', fontSize: 11, fontWeight: '800'}}
                >
                  VS
                </Text>
              </View>
              <CandidateSlot
                politician={candidateB}
                badge="B"
                badgeColor="#6366F1"
                onPress={() => setShowPickerB(true)}
              />
            </View>
          </View>
        </View>

        {!bothSelected ? (
          <EmptyCompare
            onSelectA={() => setShowPickerA(true)}
            onSelectB={() => setShowPickerB(true)}
          />
        ) : (
          <>
            <View className="h-4" />

            <StatRow
              label="Term Experience"
              left={`${candidateA.termExperienceYears} yrs`}
              right={`${candidateB.termExperienceYears} yrs`}
              leftWins={
                candidateA.termExperienceYears > candidateB.termExperienceYears
              }
              rightWins={
                candidateB.termExperienceYears > candidateA.termExperienceYears
              }
            />

            <StatRow
              label="Bills Authored"
              left={`${candidateA.billsAuthored}`}
              right={`${candidateB.billsAuthored}`}
              leftWins={candidateA.billsAuthored > candidateB.billsAuthored}
              rightWins={candidateB.billsAuthored > candidateA.billsAuthored}
            />

            <StatRow
              label="Laws Passed"
              left={`${candidateA.lawsPassed}`}
              right={`${candidateB.lawsPassed}`}
              leftWins={candidateA.lawsPassed > candidateB.lawsPassed}
              rightWins={candidateB.lawsPassed > candidateA.lawsPassed}
            />

            <AttendanceRow a={candidateA} b={candidateB} />

            <StatRow
              label="Declared Assets (SALN)"
              left={candidateA.netWorthLabel}
              right={candidateB.netWorthLabel}
              leftSub={candidateA.salnYear}
              rightSub={candidateB.salnYear}
            />

            <AccountabilityRow a={candidateA} b={candidateB} />

            <PlatformRow a={candidateA} b={candidateB} />

            <QuickInsight a={candidateA} b={candidateB} />
          </>
        )}
      </ScrollView>

      {/* ── Pickers ── */}
      <PickerModal
        visible={showPickerA}
        onClose={() => setShowPickerA(false)}
        onSelect={setCandidateA}
        exclude={candidateB?.id}
      />
      <PickerModal
        visible={showPickerB}
        onClose={() => setShowPickerB(false)}
        onSelect={setCandidateB}
        exclude={candidateA?.id}
      />
    </View>
  );
}
