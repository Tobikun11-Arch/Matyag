import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, Image, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useBallot, BALLOT_LIMITS, type BallotEntry} from '@/hooks/BallotContext';
import {type Position} from '@/constants/dataset';

// ─── Config ───────────────────────────────────────────────────────────────────
const POSITION_ACCENT: Record<Position, string> = {
  President:        '#f59e0b',
  'Vice President': '#a855f7',
  Senator:          '#3b82f6',
  'Party-list':     '#10b981',
};

const POSITION_ICON: Record<Position, string> = {
  President:        'shield',
  'Vice President': 'star',
  Senator:          'document-text',
  'Party-list':     'people',
};

const POSITION_ORDER: Position[] = [
  'President', 'Vice President', 'Senator', 'Party-list',
];

// ─── Confirm Modal ────────────────────────────────────────────────────────────
interface ModalConfig {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  iconName: string;
  iconColor: string;
  onConfirm?: () => void;
}

const HIDDEN_MODAL: ModalConfig = {
  visible: false, title: '', message: '',
  confirmLabel: '', confirmColor: '#ef4444',
  iconName: 'trash-outline', iconColor: '#ef4444',
};

function ConfirmModal({config, onClose}: {config: ModalConfig; onClose: () => void}) {
  return (
    <Modal visible={config.visible} transparent animationType="fade" statusBarTranslucent>
      <Pressable
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        onPress={onClose}
      >
        <Pressable
          onPress={e => e.stopPropagation()}
          className="bg-white rounded-3xl overflow-hidden"
          style={{width: '85%'}}
        >
          {/* Icon area */}
          <View
            className="items-center pt-8 pb-5 px-6"
            style={{backgroundColor: config.iconColor + '12'}}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
              style={{backgroundColor: config.iconColor + '22'}}
            >
              <Ionicons name={config.iconName as any} size={32} color={config.iconColor} />
            </View>
            <Text className="text-[18px] font-bold text-slate-800 text-center">{config.title}</Text>
          </View>

          {/* Message */}
          <View className="px-6 py-4">
            <Text className="text-[14px] text-slate-500 text-center leading-relaxed">{config.message}</Text>
          </View>

          {/* Buttons */}
          <View className="px-6 pb-6 gap-2">
            {config.onConfirm ? (
              <>
                <Pressable
                  onPress={() => {config.onConfirm?.(); onClose();}}
                  className="py-3.5 rounded-2xl items-center"
                  style={{backgroundColor: config.confirmColor}}
                >
                  <Text className="text-white font-bold text-[15px]">{config.confirmLabel}</Text>
                </Pressable>
                <Pressable onPress={onClose} className="py-3.5 rounded-2xl items-center bg-slate-100">
                  <Text className="text-slate-600 font-semibold text-[15px]">Cancel</Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={onClose}
                className="py-3.5 rounded-2xl items-center"
                style={{backgroundColor: config.confirmColor}}
              >
                <Text className="text-white font-bold text-[15px]">{config.confirmLabel}</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Ballot entry card ────────────────────────────────────────────────────────
function BallotCard({entry, onRemove, onPress, accent}: {
  entry: BallotEntry;
  onRemove: () => void;
  onPress: () => void;
  accent: string;
}) {
  const initials = entry.fullName.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('');
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl mb-3 overflow-hidden shadow-sm border border-slate-100"
    >
      <View style={{height: 4, backgroundColor: accent}} />
      <View className="p-4 flex-row items-center">
        <View className="w-14 h-14 rounded-full overflow-hidden mr-4" style={{backgroundColor: accent + '20'}}>
          {entry.profileSrc ? (
            <Image
              source={entry.profileSrc}
              style={{width: 56, height: 80, resizeMode: 'cover', marginBottom: -24}}
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Text className="font-bold text-[18px]" style={{color: accent}}>{initials}</Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-slate-800" numberOfLines={1}>
            {entry.honorific} {entry.fullName}
          </Text>
          <Text className="text-[12px] text-slate-400 mt-0.5">{entry.region}</Text>
          <View className="flex-row items-center mt-1.5 gap-2">
            <View className="px-2 py-0.5 rounded-full bg-slate-100">
              <Text className="text-[10px] font-semibold text-slate-500 uppercase">{entry.party}</Text>
            </View>
            <Text className="text-[11px] text-slate-400">{entry.netWorthLabel}</Text>
          </View>
        </View>
        <Pressable
          onPress={onRemove}
          className="w-8 h-8 rounded-full bg-red-50 items-center justify-center ml-2"
          hitSlop={8}
        >
          <Ionicons name="close" size={16} color="#ef4444" />
        </Pressable>
      </View>
    </Pressable>
  );
}

// ─── Empty slot ───────────────────────────────────────────────────────────────
function EmptySlot({position, onPress, accent}: {position: Position; onPress: () => void; accent: string}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl mb-3 border-2 border-dashed items-center py-5"
      style={{borderColor: accent + '60'}}
    >
      <View className="w-10 h-10 rounded-full items-center justify-center mb-2" style={{backgroundColor: accent + '15'}}>
        <Ionicons name="add" size={20} color={accent} />
      </View>
      <Text className="text-[13px] font-semibold" style={{color: accent}}>Add {position}</Text>
      <Text className="text-[11px] text-slate-400 mt-0.5">Tap to browse candidates</Text>
    </Pressable>
  );
}

// ─── Position section ─────────────────────────────────────────────────────────
function PositionSection({position, entries, onRemove, onNavigateToProfile, onAddMore}: {
  position: Position;
  entries: BallotEntry[];
  onRemove: (id: string) => void;
  onNavigateToProfile: (id: string) => void;
  onAddMore: () => void;
}) {
  const accent     = POSITION_ACCENT[position];
  const limit      = BALLOT_LIMITS[position];
  const filled     = entries.length;
  const icon       = POSITION_ICON[position];
  const emptySlots = Array.from({length: limit - filled});

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3 px-1">
        <View className="flex-row items-center gap-2">
          <View className="w-7 h-7 rounded-full items-center justify-center" style={{backgroundColor: accent + '20'}}>
            <Ionicons name={icon as any} size={14} color={accent} />
          </View>
          <Text className="text-[15px] font-bold text-slate-800">{position}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Text className="text-[12px] font-semibold" style={{color: filled === limit ? '#10b981' : '#94a3b8'}}>
            {filled}/{limit}
          </Text>
          {filled === limit && <Ionicons name="checkmark-circle" size={14} color="#10b981" />}
        </View>
      </View>
      {entries.map(entry => (
        <BallotCard
          key={entry.id}
          entry={entry}
          accent={accent}
          onRemove={() => onRemove(entry.id)}
          onPress={() => onNavigateToProfile(entry.id)}
        />
      ))}
      {emptySlots.map((_, i) => (
        <EmptySlot key={i} position={position} onPress={onAddMore} accent={accent} />
      ))}
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function BallotScreen() {
  const router = useRouter();
  const {ballot, removeFromBallot, clearBallot, filledSlots, totalSlots, completionPct} = useBallot();
  const [modal, setModal] = useState<ModalConfig>(HIDDEN_MODAL);

  const closeModal = () => setModal(HIDDEN_MODAL);

  const handleRemove = (id: string, name: string) => {
    setModal({
      visible: true,
      title: 'Remove from Ballot?',
      message: `${name} will be removed from your ballot.`,
      confirmLabel: 'Remove',
      confirmColor: '#ef4444',
      iconName: 'trash-outline',
      iconColor: '#ef4444',
      onConfirm: () => removeFromBallot(id),
    });
  };

  const handleClear = () => {
    setModal({
      visible: true,
      title: 'Clear Entire Ballot?',
      message: 'All candidates will be removed from your ballot. This cannot be undone.',
      confirmLabel: 'Clear All',
      confirmColor: '#ef4444',
      iconName: 'warning-outline',
      iconColor: '#f59e0b',
      onConfirm: clearBallot,
    });
  };

  const goToHome = () => router.push('/(tabs)');

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ConfirmModal config={modal} onClose={closeModal} />

      {/* ── Header ── */}
      <View className="bg-white px-5 pt-4 pb-4 border-b border-slate-100">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[20px] font-bold text-slate-800">National Ballot</Text>
          {filledSlots > 0 && (
            <Pressable onPress={handleClear} className="px-3 py-1 rounded-full bg-red-50">
              <Text className="text-[12px] font-semibold text-red-500">Clear All</Text>
            </Pressable>
          )}
        </View>
        <Text className="text-[12px] text-slate-400">
          {filledSlots === 0
            ? 'Browse candidates and tap the download icon to add them here.'
            : `${filledSlots} of ${totalSlots} slots filled`}
        </Text>
        {filledSlots > 0 && (
          <View className="mt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-[11px] text-slate-400">Ballot Completeness</Text>
              <Text className="text-[11px] font-bold text-slate-600">{completionPct}%</Text>
            </View>
            <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${completionPct}%`,
                  backgroundColor: completionPct === 100 ? '#10b981' : '#3b82f6',
                }}
              />
            </View>
            {completionPct < 100 && (
              <Text className="text-[11px] text-slate-400 mt-1">
                {totalSlots - filledSlots} position{totalSlots - filledSlots !== 1 ? 's' : ''} left to fill.
              </Text>
            )}
          </View>
        )}
      </View>

      {/* ── Empty state ── */}
      {filledSlots === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
            <Ionicons name="document-text-outline" size={36} color="#94a3b8" />
          </View>
          <Text className="text-[18px] font-bold text-slate-700 text-center mb-2">Your Ballot is Empty</Text>
          <Text className="text-[13px] text-slate-400 text-center leading-relaxed mb-8">
            Browse politicians and tap the{' '}
            <Text className="font-bold text-slate-600">download icon</Text>
            {' '}on their profile to add them to your ballot.
          </Text>
          <Pressable onPress={goToHome} className="px-8 py-3 rounded-2xl" style={{backgroundColor: '#1e293b'}}>
            <Text className="text-white font-bold text-[14px]">Browse Candidates</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{padding: 16, paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
        >
          {POSITION_ORDER.map(position => (
            <PositionSection
              key={position}
              position={position}
              entries={ballot[position]}
              onRemove={id => {
                const entry = ballot[position].find(e => e.id === id);
                handleRemove(id, entry?.fullName ?? '');
              }}
              onNavigateToProfile={id => router.push(`/politician/${id}`)}
              onAddMore={goToHome}
            />
          ))}

          {completionPct === 100 && (
            <View className="rounded-2xl p-5 items-center" style={{backgroundColor: '#1e293b'}}>
              <Ionicons name="checkmark-circle" size={32} color="#10b981" />
              <Text className="text-white font-bold text-[16px] mt-2">Ballot Complete!</Text>
              <Text className="text-slate-400 text-[13px] mt-1 text-center">
                You&apos;ve filled all {totalSlots} positions on your ballot.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}