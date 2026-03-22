import {type Position} from '@/constants/dataset';
import {
  BALLOT_LIMITS,
  useBallot,
  type BallotEntry
} from '@/hooks/BallotContext';
import {Ionicons} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import {useRouter} from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ViewShot, {captureRef} from 'react-native-view-shot';

const {width: W, height: H} = Dimensions.get('window');

// ─── Position config ──────────────────────────────────────────────────────────
const POSITION_ACCENT: Record<Position, string> = {
  President: '#f59e0b',
  'Vice President': '#a855f7',
  Senator: '#3b82f6',
  'Party-list': '#10b981'
};
const POSITION_ICON: Record<Position, string> = {
  President: 'shield-outline',
  'Vice President': 'star-outline',
  Senator: 'document-text-outline',
  'Party-list': 'people-outline'
};
const POSITION_SHORT: Record<Position, string> = {
  President: 'PRESIDENT',
  'Vice President': 'VICE PRES',
  Senator: 'SENATORS',
  'Party-list': 'PARTY-LIST'
};
const POSITION_ORDER: Position[] = [
  'President',
  'Vice President',
  'Senator',
  'Party-list'
];

// ─── Theme colors ─────────────────────────────────────────────────────────────
const SLIDE_BG = {
  president: '#0a1628',
  vp: '#1a0a2e',
  senators: '#0c1f0c',
  all: '#1a0a00'
};

const C = {
  white: '#ffffff',
  offWhite: '#f0f4ff',
  muted: '#94a3b8',
  mutedDark: '#334155',
  gold: '#fbbf24',
  purple: '#c084fc',
  blue: '#60a5fa',
  green: '#4ade80',
  amber: '#fb923c',
  phBlue: '#0038A8',
  phRed: '#CE1126',
  phYellow: '#FCD116'
};

// ─── Decorative blob ──────────────────────────────────────────────────────────
function Blob({
  color,
  size,
  top,
  left,
  opacity = 0.18
}: {
  color: string;
  size: number;
  top: number | string;
  left: number | string;
  opacity?: number;
}) {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size * 0.45,
        backgroundColor: color,
        opacity,
        top: top as any,
        left: left as any,
        transform: [{scaleX: 1.3}, {rotate: '-20deg'}]
      }}
    />
  );
}

// ─── PH flag strip ────────────────────────────────────────────────────────────
function FlagStrip() {
  return (
    <View style={{flexDirection: 'row', height: 4, width: '100%'}}>
      <View style={{flex: 1, backgroundColor: C.phBlue}} />
      <View style={{width: 6, backgroundColor: C.phYellow}} />
      <View style={{flex: 1, backgroundColor: C.phRed}} />
    </View>
  );
}

// ─── Slide 1: President ───────────────────────────────────────────────────────
function SlidePresident({
  candidate,
  insets,
  onShare,
  isCapturing
}: {
  candidate: BallotEntry | undefined;
  insets: {top: number; bottom: number};
  onShare: () => void;
  isCapturing?: boolean;
}) {
  const initials =
    candidate?.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join('') ?? '?';

  return (
    <View style={[ss.slide, {backgroundColor: SLIDE_BG.president}]}>
      <Blob color={C.phYellow} size={260} top={-80} left={-80} opacity={0.12} />
      <Blob
        color={C.phBlue}
        size={200}
        top={H * 0.55}
        left={W * 0.6}
        opacity={0.15}
      />
      <Blob color={C.phRed} size={150} top={H * 0.7} left={-40} opacity={0.1} />

      <View style={ss.slideMiddle}>
        {candidate ? (
          <>
            <Text style={ss.statementTop}>My chosen</Text>
            <Text style={[ss.statementBig, {color: C.gold}]}>President</Text>
            <View style={[ss.photoBig, {borderColor: C.gold}]}>
              {candidate.profileSrc ? (
                <Image
                  source={candidate.profileSrc as ImageSourcePropType}
                  style={{width: '100%', height: '150%', resizeMode: 'cover'}}
                />
              ) : (
                <View
                  style={[
                    ss.photoPlaceholder,
                    {backgroundColor: C.gold + '20'}
                  ]}
                >
                  <Text
                    style={{fontSize: 56, fontWeight: '900', color: C.gold}}
                  >
                    {initials}
                  </Text>
                </View>
              )}
            </View>
            <Text style={ss.candidateName}>{candidate.fullName}</Text>
            <Text style={[ss.subLine, {color: C.gold + 'bb'}]}>
              {candidate.party}
            </Text>
          </>
        ) : (
          <View style={ss.emptySlide}>
            <Ionicons name="shield-outline" size={64} color={C.mutedDark} />
            <Text style={ss.emptyText}>No President{'\n'}Selected</Text>
          </View>
        )}
      </View>

      <FlagStrip />

      {/* Hidden during capture so the button doesn't appear in the saved image */}
      {!isCapturing && (
        <View style={[ss.slideBottom, {paddingBottom: insets.bottom + 16}]}>
          <Pressable
            onPress={onShare}
            style={[ss.shareBtn, {borderColor: C.gold + '50'}]}
          >
            <Ionicons name="arrow-up-outline" size={16} color={C.gold} />
            <Text style={[ss.shareBtnText, {color: C.gold}]}>
              Share this slide
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ─── Slide 2: VP ──────────────────────────────────────────────────────────────
function SlideVP({
  candidate,
  insets,
  onShare,
  isCapturing
}: {
  candidate: BallotEntry | undefined;
  insets: {top: number; bottom: number};
  onShare: () => void;
  isCapturing?: boolean;
}) {
  const initials =
    candidate?.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join('') ?? '?';

  return (
    <View style={[ss.slide, {backgroundColor: SLIDE_BG.vp}]}>
      <Blob
        color={C.purple}
        size={280}
        top={-60}
        left={W * 0.3}
        opacity={0.15}
      />
      <Blob
        color={C.phBlue}
        size={180}
        top={H * 0.6}
        left={-60}
        opacity={0.12}
      />
      <Blob
        color={C.phRed}
        size={160}
        top={H * 0.65}
        left={W * 0.55}
        opacity={0.1}
      />

      <View style={ss.slideMiddle}>
        {candidate ? (
          <>
            <Text style={ss.statementTop}>My chosen</Text>
            <Text style={[ss.statementBig, {color: C.purple}]}>
              Vice{'\n'}President
            </Text>
            <View style={[ss.photoBig, {borderColor: C.purple}]}>
              {candidate.profileSrc ? (
                <Image
                  source={candidate.profileSrc as ImageSourcePropType}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                />
              ) : (
                <View
                  style={[
                    ss.photoPlaceholder,
                    {backgroundColor: C.purple + '20'}
                  ]}
                >
                  <Text
                    style={{fontSize: 56, fontWeight: '900', color: C.purple}}
                  >
                    {initials}
                  </Text>
                </View>
              )}
            </View>
            <Text style={ss.candidateName}>{candidate.fullName}</Text>
            <Text style={[ss.subLine, {color: C.purple + 'bb'}]}>
              {candidate.party}
            </Text>
          </>
        ) : (
          <View style={ss.emptySlide}>
            <Ionicons name="star-outline" size={64} color={C.mutedDark} />
            <Text style={ss.emptyText}>No Vice President{'\n'}Selected</Text>
          </View>
        )}
      </View>

      <FlagStrip />

      {!isCapturing && (
        <View style={[ss.slideBottom, {paddingBottom: insets.bottom + 16}]}>
          <Pressable
            onPress={onShare}
            style={[ss.shareBtn, {borderColor: C.purple + '50'}]}
          >
            <Ionicons name="arrow-up-outline" size={16} color={C.purple} />
            <Text style={[ss.shareBtnText, {color: C.purple}]}>
              Share this slide
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ─── Slide 3: Full Ballot ─────────────────────────────────────────────────────
function SlideAllBallot({
  ballot,
  completionPct,
  insets,
  onShare,
  isCapturing
}: {
  ballot: Record<Position, BallotEntry[]>;
  completionPct: number;
  insets: {top: number; bottom: number};
  onShare: () => void;
  isCapturing?: boolean;
}) {
  const president = ballot?.President?.[0];
  const vp = ballot?.['Vice President']?.[0];
  const senators = ballot?.Senator || [];
  const partylist = ballot?.['Party-list'] || [];

  return (
    <View style={[ss.slide, {backgroundColor: SLIDE_BG.all}]}>
      <Blob color={C.amber} size={220} top={-50} left={-60} opacity={0.15} />
      <Blob
        color={C.phRed}
        size={180}
        top={H * 0.5}
        left={W * 0.55}
        opacity={0.1}
      />
      <Blob
        color={C.phBlue}
        size={160}
        top={H * 0.7}
        left={-30}
        opacity={0.1}
      />

      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 28,
          paddingTop: 106,
          paddingBottom: 8,
          gap: 14
        }}
      >
        <View>
          <Text
            style={[
              ss.listTitle,
              {color: C.amber, fontSize: 15, lineHeight: 17}
            ]}
          >
            My Complete
          </Text>
          <Text
            style={[
              ss.listTitleBig,
              {fontSize: 24, lineHeight: 26, marginBottom: 0}
            ]}
          >
            Ballot 🗳️
          </Text>
        </View>

        {/* President + VP */}
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={{flex: 1}}>
            <View
              style={{
                aspectRatio: 0.82,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: C.gold + '20',
                borderWidth: 1.5,
                borderColor: C.gold + '50',
                marginBottom: 5
              }}
            >
              {president?.profileSrc ? (
                <Image
                  source={president.profileSrc as ImageSourcePropType}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{fontSize: 28, fontWeight: '900', color: C.gold}}
                  >
                    {president?.fullName
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map(n => n[0])
                      .join('') ?? '?'}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: 8,
                fontWeight: '800',
                color: C.gold,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 1
              }}
            >
              President
            </Text>
            <Text
              style={{fontSize: 12, fontWeight: '900', color: C.white}}
              numberOfLines={1}
            >
              {president?.fullName.trim().split(' ').slice(-1)[0] ?? '—'}
            </Text>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                aspectRatio: 0.82,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: C.purple + '20',
                borderWidth: 1.5,
                borderColor: C.purple + '50',
                marginBottom: 5
              }}
            >
              {vp?.profileSrc ? (
                <Image
                  source={vp.profileSrc as ImageSourcePropType}
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{fontSize: 28, fontWeight: '900', color: C.purple}}
                  >
                    {vp?.fullName
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map(n => n[0])
                      .join('') ?? '?'}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: 8,
                fontWeight: '800',
                color: C.purple,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 1
              }}
            >
              Vice President
            </Text>
            <Text
              style={{fontSize: 12, fontWeight: '900', color: C.white}}
              numberOfLines={1}
            >
              {vp?.fullName.trim().split(' ').slice(-1)[0] ?? '—'}
            </Text>
          </View>
        </View>

        {/* Senators */}
        {senators.length > 0 && (
          <View>
            <View
              style={[ss.listSectionHeader, {marginTop: 0, marginBottom: 5}]}
            >
              <View
                style={{
                  width: 3,
                  height: 12,
                  backgroundColor: C.blue,
                  borderRadius: 2
                }}
              />
              <Text style={[ss.listSectionTitle, {color: C.blue}]}>
                Senators
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 24}}>
              <View style={{flex: 1, gap: 2}}>
                {senators.slice(0, 6).map((sen, i) => (
                  <View
                    key={sen.id}
                    style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '900',
                        color: C.blue,
                        width: 16
                      }}
                    >
                      {i + 1}
                    </Text>
                    <Text
                      style={{fontSize: 12, fontWeight: '700', color: C.white}}
                      numberOfLines={1}
                    >
                      {sen.fullName.split(' ')[0]}
                    </Text>
                  </View>
                ))}
              </View>
              {senators.length > 6 && (
                <View style={{flex: 1, gap: 2}}>
                  {senators.slice(6, 12).map((sen, i) => (
                    <View
                      key={sen.id}
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '900',
                          color: C.blue,
                          width: 16
                        }}
                      >
                        {i + 7}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: C.white
                        }}
                        numberOfLines={1}
                      >
                        {sen.fullName.trim().split(' ').slice(-1)[0]}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* Party-list */}
        {partylist.length > 0 && (
          <View>
            <View
              style={[ss.listSectionHeader, {marginTop: 0, marginBottom: 5}]}
            >
              <View
                style={{
                  width: 3,
                  height: 12,
                  backgroundColor: C.green,
                  borderRadius: 2
                }}
              />
              <Text style={[ss.listSectionTitle, {color: C.green}]}>
                Party-list
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '900',
                  color: C.green,
                  width: 16
                }}
              >
                1
              </Text>
              <Text
                style={{fontSize: 12, fontWeight: '700', color: C.white}}
                numberOfLines={1}
              >
                {partylist[0].fullName.trim().split(' ').slice(-1)[0]}
              </Text>
            </View>
          </View>
        )}
      </View>

      <FlagStrip />

      {!isCapturing && (
        <View style={[ss.slideBottom, {paddingBottom: insets.bottom + 16}]}>
          <Pressable
            onPress={onShare}
            style={[ss.shareBtn, {borderColor: C.gold + '50'}]}
          >
            <Ionicons name="arrow-up-outline" size={16} color={C.gold} />
            <Text style={[ss.shareBtnText, {color: C.gold}]}>
              Share this slide
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ─── Wrapped Story Modal ──────────────────────────────────────────────────────
function BallotWrappedStory({
  visible,
  onClose,
  ballot,
  completionPct,
  filledSlots,
  totalSlots
}: {
  visible: boolean;
  onClose: () => void;
  ballot: Record<Position, BallotEntry[]>;
  completionPct: number;
  filledSlots: number;
  totalSlots: number;
}) {
  const insets = useSafeAreaInsets();
  const [slide, setSlide] = useState(0);
  // null = not capturing; 0/1/2 = which slide index is being captured
  const [capturingIndex, setCapturingIndex] = useState<number | null>(null);
  const listRef = useRef<FlatList>(null);

  // One ref per slide
  const presRef = useRef<ViewShot>(null);
  const vpRef = useRef<ViewShot>(null);
  const allRef = useRef<ViewShot>(null);
  const SLIDE_REFS = [presRef, vpRef, allRef];

  const president = ballot?.President?.[0];
  const vp = ballot?.['Vice President']?.[0];

  async function shareSlide(slideIndex: number) {
    if (capturingIndex !== null) return;
    try {
      setCapturingIndex(slideIndex);
      await new Promise(resolve => setTimeout(resolve, 80));

      const ref = SLIDE_REFS[slideIndex];
      if (!ref?.current) return;

      const uri = await captureRef(ref, {
        format: 'jpg',
        quality: 1,
        result: 'tmpfile'
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Share your ballot slide'
        });
      } else {
        // Save to gallery — request only PHOTOS permission, not AUDIO
        const {status} = await MediaLibrary.requestPermissionsAsync(false); // false = writeOnly
        if (status !== 'granted') {
          Alert.alert(
            'Permission needed',
            'Allow photo library access to save your slide.'
          );
          return;
        }
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('Saved! 🎉', 'Slide saved to your photo library.');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not capture slide. Please try again.');
      console.error(err);
    } finally {
      setCapturingIndex(null);
    }
  }

  const SLIDES = [
    {
      key: 'pres',
      bg: SLIDE_BG.president,
      ref: presRef,
      node: (
        <SlidePresident
          candidate={president}
          insets={insets}
          onShare={() => shareSlide(0)}
          isCapturing={capturingIndex === 0}
        />
      )
    },
    {
      key: 'vp',
      bg: SLIDE_BG.vp,
      ref: vpRef,
      node: (
        <SlideVP
          candidate={vp}
          insets={insets}
          onShare={() => shareSlide(1)}
          isCapturing={capturingIndex === 1}
        />
      )
    },
    {
      key: 'all',
      bg: SLIDE_BG.all,
      ref: allRef,
      node: (
        <SlideAllBallot
          ballot={ballot}
          completionPct={completionPct}
          insets={insets}
          onShare={() => shareSlide(2)}
          isCapturing={capturingIndex === 2}
        />
      )
    }
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      presentationStyle="fullScreen"
    >
      <View style={{flex: 1, backgroundColor: '#000'}}>
        {/* Progress bars */}
        <View style={[ps.row, {paddingTop: insets.top + 8}]}>
          {SLIDES.map((_, i) => (
            <View key={i} style={ps.track}>
              <View
                style={[
                  ps.fill,
                  {
                    width: i <= slide ? '100%' : '0%',
                    backgroundColor: i <= slide ? C.white : 'transparent'
                  }
                ]}
              />
            </View>
          ))}
        </View>

        {/* Close button */}
        <Pressable
          onPress={onClose}
          style={[ps.closeBtn, {top: insets.top + 10}]}
        >
          <Ionicons name="close" size={20} color={C.white} />
        </Pressable>

        {/* Capturing overlay */}
        {capturingIndex !== null && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              backgroundColor: 'rgba(0,0,0,0.55)',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: 'rgba(255,255,255,0.12)',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons name="image-outline" size={30} color={C.white} />
            </View>
            <Text
              style={{
                color: C.white,
                fontWeight: '700',
                fontSize: 15,
                letterSpacing: 0.2
              }}
            >
              Preparing image…
            </Text>
          </View>
        )}

        {/* Slides — each wrapped in ViewShot for capture */}
        <FlatList
          ref={listRef}
          data={SLIDES}
          keyExtractor={item => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={capturingIndex === null}
          onMomentumScrollEnd={e => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / W);
            setSlide(Math.max(0, Math.min(idx, SLIDES.length - 1)));
          }}
          renderItem={({item}) => (
            <View style={{width: W, height: H, backgroundColor: item.bg}}>
              <ViewShot
                ref={item.ref}
                style={{flex: 1, width: W, backgroundColor: item.bg}}
                options={{format: 'jpg', quality: 1}}
              >
                {item.node}
              </ViewShot>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

// ─── Slide styles ─────────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  slide: {width: W, height: H, alignItems: 'center'},
  slideTop: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
    zIndex: 2
  },
  slideMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 32,
    zIndex: 2
  },
  slideBottom: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8
  },
  slideBottomSolid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 10
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2.5,
    textTransform: 'uppercase'
  },
  statementTop: {
    fontSize: 22,
    fontWeight: '700',
    color: C.white,
    textAlign: 'center',
    marginBottom: 2,
    opacity: 0.85
  },
  statementBig: {
    fontSize: 52,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 54,
    letterSpacing: -1.5,
    marginBottom: 20
  },
  photoBig: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    borderWidth: 4,
    marginBottom: 20
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  candidateName: {
    fontSize: 22,
    fontWeight: '900',
    color: C.white,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 26,
    marginBottom: 6
  },
  subLine: {fontSize: 13, fontWeight: '600', textAlign: 'center'},
  emptySlide: {alignItems: 'center', gap: 14},
  emptyText: {
    fontSize: 22,
    fontWeight: '900',
    color: C.mutedDark,
    textAlign: 'center',
    lineHeight: 28
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.06)'
  },
  shareBtnText: {fontSize: 13, fontWeight: '800', letterSpacing: 0.3},
  shareBtnFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 100
  },
  shareBtnFullText: {
    fontSize: 15,
    fontWeight: '900',
    color: C.white,
    letterSpacing: 0.2
  },
  listTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: 32
  },
  listTitleBig: {
    fontSize: 44,
    fontWeight: '900',
    color: C.white,
    letterSpacing: -1.5,
    lineHeight: 48,
    marginBottom: 4
  },
  listSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 0,
    marginBottom: 5
  },
  listSectionTitle: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase'
  }
});

// ─── Progress bar styles ──────────────────────────────────────────────────────
const ps = StyleSheet.create({
  row: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 99,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  track: {
    flex: 1,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden'
  },
  fill: {height: '100%', borderRadius: 2},
  closeBtn: {
    position: 'absolute',
    right: 16,
    zIndex: 100,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

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
  visible: false,
  title: '',
  message: '',
  confirmLabel: '',
  confirmColor: '#ef4444',
  iconName: 'trash-outline',
  iconColor: '#ef4444'
};

function ConfirmModal({
  config,
  onClose
}: {
  config: ModalConfig;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={config.visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0,0,0,0.6)'}}
        onPress={onClose}
      >
        <Pressable
          onPress={e => e.stopPropagation()}
          className="bg-white rounded-3xl overflow-hidden w-[85%]"
        >
          <View
            className="items-center pt-8 pb-5 px-6"
            style={{backgroundColor: config.iconColor + '12'}}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-3"
              style={{backgroundColor: config.iconColor + '22'}}
            >
              <Ionicons
                name={config.iconName as any}
                size={32}
                color={config.iconColor}
              />
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
          <View className="px-6 pb-6 gap-2">
            {config.onConfirm ? (
              <>
                <Pressable
                  onPress={() => {
                    config.onConfirm?.();
                    onClose();
                  }}
                  className="py-3.5 rounded-2xl items-center"
                  style={{backgroundColor: config.confirmColor}}
                >
                  <Text className="text-white font-bold text-[15px]">
                    {config.confirmLabel}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={onClose}
                  className="py-3.5 rounded-2xl items-center bg-slate-100"
                >
                  <Text className="text-slate-600 font-semibold text-[15px]">
                    Cancel
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={onClose}
                className="py-3.5 rounded-2xl items-center"
                style={{backgroundColor: config.confirmColor}}
              >
                <Text className="text-white font-bold text-[15px]">
                  {config.confirmLabel}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Position Tab ─────────────────────────────────────────────────────────────
function PositionTab({
  position,
  isActive,
  filled,
  limit,
  onPress
}: {
  position: Position;
  isActive: boolean;
  filled: number;
  limit: number;
  onPress: () => void;
}) {
  const accent = POSITION_ACCENT[position];
  const icon = POSITION_ICON[position];
  const isDone = filled === limit;
  return (
    <Pressable onPress={onPress} className="items-center">
      <View
        className="w-12 h-12 rounded-full items-center justify-center mb-1.5"
        style={{
          backgroundColor: isActive
            ? '#1e293b'
            : isDone
              ? accent + '20'
              : '#f1f5f9',
          borderWidth: isActive ? 0 : isDone ? 2 : 0,
          borderColor: accent
        }}
      >
        <Ionicons
          name={icon as any}
          size={20}
          color={isActive ? 'white' : isDone ? accent : '#94a3b8'}
        />
        {isDone && !isActive && (
          <View className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 items-center justify-center border-2 border-white">
            <Ionicons name="checkmark" size={9} color="white" />
          </View>
        )}
      </View>
      <Text
        className="text-[9px] font-bold text-center tracking-wide"
        style={{color: isActive ? '#1e293b' : '#94a3b8'}}
      >
        {POSITION_SHORT[position]}
      </Text>
      {isActive && (
        <View className="w-6 h-0.5 rounded-full bg-slate-800 mt-1" />
      )}
    </Pressable>
  );
}

// ─── Ballot Card ──────────────────────────────────────────────────────────────
function BallotCard({
  entry,
  onRemove,
  onPress,
  accent
}: {
  entry: BallotEntry;
  onRemove: () => void;
  onPress: () => void;
  accent: string;
}) {
  const initials = entry.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0])
    .join('');
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-3xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: {width: 0, height: 4},
        elevation: 4
      }}
    >
      <View
        className="relative"
        style={{height: 180, backgroundColor: accent + '15'}}
      >
        {entry.profileSrc ? (
          <Image
            source={entry.profileSrc as ImageSourcePropType}
            style={{width: '100%', height: 180, resizeMode: 'cover'}}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text
              className="text-5xl font-black"
              style={{color: accent + '60'}}
            >
              {initials}
            </Text>
          </View>
        )}
        <View
          className="absolute bottom-0 left-0 right-0"
          style={{height: 60, backgroundColor: 'rgba(0,0,0,0.3)'}}
        />
        <View
          className="absolute bottom-3 left-3.5 rounded-full px-2.5 py-0.5"
          style={{backgroundColor: accent}}
        >
          <Text className="text-[9px] font-black text-white tracking-widest uppercase">
            {entry.position}
          </Text>
        </View>
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full items-center justify-center"
          style={{backgroundColor: 'rgba(255,255,255,0.9)'}}
        >
          <Ionicons name="close" size={15} color="#ef4444" />
        </Pressable>
      </View>
      <View className="p-3.5">
        <Text
          className="text-[18px] font-black text-slate-900 mb-2.5"
          style={{letterSpacing: -0.3}}
          numberOfLines={1}
        >
          {entry.honorific} {entry.fullName}
        </Text>
        <View className="flex-row justify-between mb-2">
          <View>
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Party
            </Text>
            <Text className="text-[12px] font-semibold text-slate-700">
              {entry.party}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Region
            </Text>
            <Text className="text-[12px] font-semibold text-slate-700">
              {entry.region}
            </Text>
          </View>
        </View>
        <View className="h-px bg-slate-100 mb-2" />
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="wallet-outline" size={12} color="#94a3b8" />
          <Text className="text-[11px] text-slate-400">
            Net Worth:{' '}
            <Text className="text-slate-600 font-semibold">
              {entry.netWorthLabel}
            </Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// ─── Empty Slot ───────────────────────────────────────────────────────────────
function EmptySlot({
  position,
  onPress,
  accent
}: {
  position: Position;
  onPress: () => void;
  accent: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-3xl items-center justify-center gap-2.5"
      style={{
        height: 317,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: accent + '50',
        backgroundColor: accent + '06'
      }}
    >
      <View
        className="w-14 h-14 rounded-full items-center justify-center"
        style={{backgroundColor: accent + '15'}}
      >
        <Ionicons name="add" size={26} color={accent} />
      </View>
      <Text className="text-[14px] font-bold" style={{color: accent}}>
        Add {position}
      </Text>
      <Text className="text-[11px] text-slate-400">
        Tap to browse candidates
      </Text>
    </Pressable>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function BallotScreen() {
  const router = useRouter();
  const {
    ballot,
    removeFromBallot,
    clearBallot,
    filledSlots,
    totalSlots,
    completionPct
  } = useBallot();
  const [modal, setModal] = useState<ModalConfig>(HIDDEN_MODAL);
  const [activePos, setActivePos] = useState<Position>('President');
  const [wrappedVisible, setWrappedVisible] = useState(false);

  const closeModal = () => setModal(HIDDEN_MODAL);

  const handleRemove = (id: string, name: string) =>
    setModal({
      visible: true,
      title: 'Remove from Ballot?',
      message: `${name} will be removed from your ballot.`,
      confirmLabel: 'Remove',
      confirmColor: '#ef4444',
      iconName: 'trash-outline',
      iconColor: '#ef4444',
      onConfirm: () => removeFromBallot(id)
    });

  const handleClear = () =>
    setModal({
      visible: true,
      title: 'Clear Entire Ballot?',
      message:
        'All candidates will be removed from your ballot. This cannot be undone.',
      confirmLabel: 'Clear All',
      confirmColor: '#ef4444',
      iconName: 'warning-outline',
      iconColor: '#f59e0b',
      onConfirm: clearBallot
    });

  const handleAddPosition = (position: Position) => {
    router.push(`/?addPosition=${position}`);
  };

  const activeEntries = ballot[activePos];
  const activeLimit = BALLOT_LIMITS[activePos];
  const activeAccent = POSITION_ACCENT[activePos];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ConfirmModal config={modal} onClose={closeModal} />
      <BallotWrappedStory
        visible={wrappedVisible}
        onClose={() => setWrappedVisible(false)}
        ballot={ballot}
        completionPct={completionPct}
        filledSlots={filledSlots}
        totalSlots={totalSlots}
      />

      {/* ── Header ── */}
      <View className="bg-white px-5 pt-4 pb-0 border-b border-slate-100">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text
              className="text-[22px] font-black text-slate-900"
              style={{letterSpacing: -0.5}}
            >
              National Ballot
            </Text>
            <Text className="text-[12px] text-slate-400 mt-0.5">
              {filledSlots === 0
                ? 'Add candidates to your personal ballot'
                : `${filledSlots} of ${totalSlots} positions filled`}
            </Text>
          </View>
          {filledSlots > 0 && (
            <Pressable
              onPress={handleClear}
              className="px-3 py-1.5 rounded-full bg-red-50"
            >
              <Text className="text-[12px] font-bold text-red-500">
                Clear All
              </Text>
            </Pressable>
          )}
        </View>

        {filledSlots > 0 && (
          <View className="mb-4">
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Ballot Completeness
              </Text>
              <Text
                className="text-[12px] font-black"
                style={{color: completionPct === 100 ? '#10b981' : '#1e293b'}}
              >
                {completionPct}%
              </Text>
            </View>
            <View
              className="h-1.5 bg-slate-100 rounded-full overflow-hidden"
              style={{marginBottom: completionPct < 100 ? 6 : 0}}
            >
              <View
                className="h-full rounded-full"
                style={{
                  width: `${completionPct}%`,
                  backgroundColor: completionPct === 100 ? '#10b981' : '#1e293b'
                }}
              />
            </View>
            {completionPct < 100 && (
              <Text className="text-[11px] text-slate-400">
                {totalSlots - filledSlots} position
                {totalSlots - filledSlots !== 1 ? 's' : ''} left to fill.
              </Text>
            )}
          </View>
        )}

        <View className="flex-row items-start pb-4 justify-between">
          {POSITION_ORDER.map((pos, index) => (
            <React.Fragment key={pos}>
              <PositionTab
                position={pos}
                isActive={activePos === pos}
                filled={ballot[pos].length}
                limit={BALLOT_LIMITS[pos]}
                onPress={() => setActivePos(pos)}
              />
              {index < POSITION_ORDER.length - 1 && (
                <View
                  className="flex-1 h-0.5 mt-6"
                  style={{
                    backgroundColor:
                      ballot[pos].length === BALLOT_LIMITS[pos] &&
                      ballot[POSITION_ORDER[index + 1]].length ===
                        BALLOT_LIMITS[POSITION_ORDER[index + 1]]
                        ? '#10b981'
                        : ballot[pos].length === BALLOT_LIMITS[pos]
                          ? '#1e293b'
                          : '#e2e8f0'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* ── Content ── */}
      {filledSlots === 0 && activeEntries.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
            <Ionicons name="document-text-outline" size={36} color="#94a3b8" />
          </View>
          <Text className="text-[18px] font-black text-slate-800 text-center mb-2">
            Your Ballot is Empty
          </Text>
          <Text className="text-[13px] text-slate-400 text-center leading-5 mb-8">
            Browse politicians and tap the{' '}
            <Text className="font-bold text-slate-600">download icon</Text> on
            their profile to add them here.
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)')}
            className="px-8 py-3.5 rounded-2xl bg-slate-800"
          >
            <Text className="text-[14px] font-bold text-white">
              Browse Candidates
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{padding: 16, paddingBottom: 220}}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View
                className="w-2 h-2 rounded-full"
                style={{backgroundColor: activeAccent}}
              />
              <Text className="text-[13px] font-bold text-slate-500 tracking-wide">
                {activePos.toUpperCase()}
              </Text>
            </View>
            <Text
              className="text-[12px] font-bold"
              style={{
                color:
                  activeEntries.length === activeLimit ? '#10b981' : '#94a3b8'
              }}
            >
              {activeEntries.length}/{activeLimit}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 12, paddingRight: 4, paddingBottom: 4}}
            className="mb-3"
          >
            {activeEntries.map(entry => (
              <View key={entry.id} style={{width: 260}}>
                <BallotCard
                  entry={entry}
                  accent={activeAccent}
                  onRemove={() => handleRemove(entry.id, entry.fullName)}
                  onPress={() => router.push(`/politician/${entry.id}`)}
                />
              </View>
            ))}
            {activeEntries.length < activeLimit && (
              <View style={{width: 260}}>
                <EmptySlot
                  position={activePos}
                  onPress={() => handleAddPosition(activePos)}
                  accent={activeAccent}
                />
              </View>
            )}
          </ScrollView>

          {completionPct === 100 && (
            <View className="rounded-2xl p-5 items-center bg-slate-800 mt-2">
              <Ionicons name="checkmark-circle" size={32} color="#10b981" />
              <Text className="text-white font-black text-[16px] mt-2">
                Ballot Complete!
              </Text>
              <Text className="text-slate-400 text-[13px] mt-1 text-center">
                You&apos;ve filled all {totalSlots} positions on your ballot.
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* ── Share Ballot Wrapped button ── */}
      {filledSlots > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 px-5 pt-3 bg-white border-t border-slate-100"
          style={{paddingBottom: 120}}
        >
          <Pressable
            onPress={() => setWrappedVisible(true)}
            className="flex-row items-center justify-center gap-2 py-4 rounded-full bg-slate-800"
          >
            <Ionicons name="share-outline" size={18} color="white" />
            <Text className="text-[15px] font-bold text-white tracking-wide">
              Share Ballot Wrapped
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
