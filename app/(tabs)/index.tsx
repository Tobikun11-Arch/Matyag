import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {
  allPoliticians,
  type Politician,
  type Position
} from '@/constants/dataset';

// ─── Position filter config ───────────────────────────────────────────────────
const POSITION_FILTERS: {label: string; value: Position | 'All'}[] = [
  {label: 'All', value: 'All'},
  {label: 'President', value: 'President'},
  {label: 'Vice President', value: 'Vice President'},
  {label: 'Senator', value: 'Senator'},
  {label: 'Party-list', value: 'Party-list'}
];

// ─── Position badge colours ───────────────────────────────────────────────────
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

const BRANCH_LABEL: Record<Position, string> = {
  President: 'Executive · National',
  'Vice President': 'Executive · National',
  Senator: 'Legislative · National',
  'Party-list': 'Legislative · National'
};

// ─── Flag indicator ───────────────────────────────────────────────────────────
function FlagDot({status}: {status: string}) {
  if (status === 'clear') return null;
  const colour = status === 'pending' ? 'bg-red-500' : 'bg-yellow-400';
  return (
    <View
      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${colour} border-2 border-white`}
    />
  );
}

// ─── Single politician card ───────────────────────────────────────────────────
function PoliticianCard({
  item,
  onPress
}: {
  item: Politician;
  onPress: () => void;
}) {
  const colors = POSITION_COLORS[item.position];
  const branch = BRANCH_LABEL[item.position];
  const initials = `${item.firstName[0]}${item.lastName[0]}`;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-4 bg-white active:bg-slate-50"
    >
      {/* Avatar */}
      <View className="relative mr-4">
        <View className="w-14 h-14 rounded-full bg-slate-200 items-center justify-center overflow-hidden">
          {item.profileSrc ? (
            <Image source={item.profileSrc} className="w-14 h-14" />
          ) : (
            <Text className="text-slate-500 font-bold text-lg">{initials}</Text>
          )}
        </View>
        <FlagDot status={item.accountabilityFlags.status} />
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text
          className="text-[15px] font-semibold text-slate-800"
          numberOfLines={1}
        >
          {item.honorific} {item.fullName}
        </Text>
        <View className="flex-row items-center mt-1 gap-2">
          {/* Position badge */}
          <View
            className={`flex-row items-center px-2 py-0.5 rounded-full ${colors.bg}`}
          >
            <View className={`w-1.5 h-1.5 rounded-full mr-1 ${colors.dot}`} />
            <Text className={`text-[11px] font-medium ${colors.text}`}>
              {item.position}
            </Text>
          </View>
          <Text className="text-[11px] text-slate-400">{branch}</Text>
        </View>
        {item.organization && (
          <Text className="text-[11px] text-slate-400 mt-0.5" numberOfLines={1}>
            {item.organization}
          </Text>
        )}
      </View>

      {/* Chevron */}
      <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
    </Pressable>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <View className="h-px bg-slate-100 mx-5" />;
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({title, count}: {title: string; count: number}) {
  return (
    <View className="px-5 pt-5 pb-2 flex-row items-center justify-between">
      <Text className="text-[13px] font-semibold text-slate-400 uppercase tracking-widest">
        {title}
      </Text>
      <Text className="text-[12px] text-slate-400">{count} total</Text>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setFilter] = useState<Position | 'All'>('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Featured / default politicians shown before any search
  const featured = useMemo(
    () =>
      allPoliticians.filter(p =>
        ['p-001', 'p-002', 'vp-001', 's-002', 's-006', 'pl-003'].includes(p.id)
      ),
    []
  );

  // Filtered results when user types or picks a position
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allPoliticians.filter(p => {
      const matchesQuery =
        q === '' ||
        p.fullName.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.party.toLowerCase().includes(q) ||
        (p.organization ?? '').toLowerCase().includes(q);
      const matchesFilter =
        activeFilter === 'All' || p.position === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const isSearching = query.trim() !== '' || activeFilter !== 'All';

  const navigateTo = (id: string) => router.push(`/politician/${id}`);

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* ── Header ── */}
      <View className="bg-white pt-14 pb-4 px-5 border-b border-slate-100">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <View className="w-7 h-7 bg-[#1e293b] rounded items-center justify-center">
              <Ionicons name="business" size={14} color="white" />
            </View>
            <Text className="text-xl font-bold text-slate-800 tracking-tight">
              Matyag
            </Text>
          </View>
          <Pressable className="relative">
            <Ionicons name="notifications-outline" size={22} color="#64748b" />
          </Pressable>
        </View>

        {/* Search bar */}
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center bg-slate-100 rounded-xl px-3 h-11">
            <Ionicons name="search-outline" size={17} color="#94a3b8" />
            <TextInput
              className="flex-1 ml-2 text-[14px] text-slate-700"
              placeholder="Search by name, position..."
              placeholderTextColor="#94a3b8"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={17} color="#94a3b8" />
              </Pressable>
            )}
          </View>
          {/* Filter toggle */}
          <Pressable
            onPress={() => setShowFilterMenu(v => !v)}
            className={`w-11 h-11 rounded-xl items-center justify-center ${showFilterMenu ? 'bg-[#1e293b]' : 'bg-slate-100'}`}
          >
            <Ionicons
              name="options-outline"
              size={19}
              color={showFilterMenu ? 'white' : '#64748b'}
            />
          </Pressable>
        </View>

        {/* Position filter chips */}
        {showFilterMenu && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 -mx-1"
            contentContainerStyle={{paddingHorizontal: 4, gap: 8}}
          >
            {POSITION_FILTERS.map(f => {
              const active = activeFilter === f.value;
              return (
                <Pressable
                  key={f.value}
                  onPress={() => setFilter(f.value as Position | 'All')}
                  className={`px-4 py-1.5 rounded-full border ${
                    active
                      ? 'bg-[#1e293b] border-[#1e293b]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-[13px] font-medium ${
                      active ? 'text-white' : 'text-slate-600'
                    }`}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* ── Content ── */}
      {isSearching ? (
        // ── Search / filtered results ──
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <SectionHeader
              title={activeFilter === 'All' ? 'Search Results' : activeFilter}
              count={results.length}
            />
          }
          ListEmptyComponent={
            <View className="items-center py-20">
              <Ionicons name="search" size={40} color="#cbd5e1" />
              <Text className="text-slate-400 mt-3 text-[14px]">
                No politicians found
              </Text>
              <Text className="text-slate-300 text-[12px] mt-1">
                Try a different name or position
              </Text>
            </View>
          }
          renderItem={({item, index}) => (
            <>
              <PoliticianCard item={item} onPress={() => navigateTo(item.id)} />
              {index < results.length - 1 && <Divider />}
            </>
          )}
          contentContainerStyle={{paddingBottom: 100}}
        />
      ) : (
        // ── Default browsing view ──
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <>
              {/* Featured */}
              <SectionHeader title="Featured" count={featured.length} />
              <View className="bg-white rounded-2xl mx-4 overflow-hidden shadow-sm">
                {featured.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <PoliticianCard
                      item={item}
                      onPress={() => navigateTo(item.id)}
                    />
                    {index < featured.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </View>
            </>
          }
        />
      )}
    </View>
  );
}
