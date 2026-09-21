/**
 * ============================================================
 *  EDIT THIS FILE — everything personal lives here.
 * ============================================================
 * Replace names, photos, captions, the letter, the song file,
 * colors, and any on-screen copy without touching components.
 */

export const palette = {
  blush: '#E8B4B8',
  rose: '#C97B84',
  champagne: '#F3E6C8',
  ivory: '#FBF6F0',
  burgundy: '#3D1524',
  wine: '#6B2436',
  plum: '#4A2C45',
  gold: '#C9A86C',
  night: '#140C12',
  dusk: '#1E1218',
} as const

export const content = {
  herName: 'nanna',
  myName: 'your worst part',

  opening: {
    title: 'Hey beautiful… ❤️',
    subtitle: 'I made something for you…',
    imageUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    startLabel: 'START',
  },

  question: {
    title: 'Do you love me? 👀❤️',
    yes: 'YES ❤️',
    no: 'NO 🙃',
    noDodges: [
      'Nice try 😌',
      'You really thought? 😂',
      'Error 404: NO not found',
      'Wrong answer detected 🚨',
      'Try again, madam 😂',
    ],
    afterAttempts: 'Okay okay… we both know the answer. 😌❤️',
    attemptsBeforeGiveIn: 5,
  },

  game: {
    title: 'Okay… now prove it. ❤️',
    instruction: 'Catch the hearts before they disappear!',
    needed: 5,
    counterLabel: 'HEARTS CAUGHT',
  },

  stolenHeart: {
    whisper: "So that's how it happened…",
    reveal: 'You stole my heart. ❤️',
    continueLabel: 'Continue ❤️',
  },

  memories: {
    title: 'Three little pieces of our story…',
    continueLabel: 'Continue ❤️',
    hint: 'Open each one',
    items: [
      {
        number: '01',
        title: 'The Beginning',
        caption:
          'ee pic gurthu undhi aa nuvvu naku first petina pic… nenu love at first sight gurinchi pedha namanu gani, i felt it.',
        mediaType: 'photo',
        photo: '/memories/01.svg.jpeg',
      },
      {
        number: '02',
        title: 'That One Moment',
        caption:
          'idhi gurthu undhi aa manam weekly anniversary cheskune valam kadha… see how happy we were then.',
        mediaType: 'video',
        photo: '/memories/02-poster.svg',
        video: '/memories/02.mp4',
      },
      {
        number: '03',
        title: 'My Favorite Memory',
        caption:
          'idhe na favourite memory… endhuko telusa, it’s not only about the touch. naku ela anipinchindhi ante, ni hand hold chesaka i felt like a kid… oka diaryam vachindhi, naku kuda okalu unaru ani oka happiness. it’s not only about the physical touch.',
        mediaType: 'photo',
        photo: '/memories/03.svg.jpeg',
      },
    ],
  },

  song: {
    kicker: 'This song reminds me of you…',
    title: 'The Metro Proposal',
    artist: 'Sai Abhyankar',
    /**
     * Put your audio file here:
     *   public/audio/dedication.mp3
     * Do not autoplay — she presses play.
     */
    audioSrc: '/audio/dedication.mp3',
    /**
     * These are ORIGINAL dedication lines — not song lyrics.
     * If you have permission to quote a short authorized excerpt,
     * replace the three strings below with that excerpt (keep it short).
     * Do not paste the full lyrics of the song.
     */
    dedicationLines: [
      'ee bgm vina prathi sari nuvve gurthosthav… endhuku ante, I really see a lot of love in those eyes. may be ee bgm manakosame petaru emo anipistundhi.',
    ],
    continueLabel: 'Continue ❤️',
  },

  boxes: {
    title: 'I have one more little surprise…',
    labels: ['OPEN ME', 'TRY THIS ONE', 'ONE LAST SURPRISE'] as const,
    revealTitle: 'Happy Birthday, {herName}! 🎂❤️',
  },

  cake: {
    wish: 'Make a wish… ✨',
    blowButton: 'Blow the Candles ✨',
    micHint: 'or enable a gentle blow',
    wishMade: 'Wish made. ❤️',
    candleCount: 5,
  },

  letter: {
    title: 'One last thing…',
    /**
     * Write your real letter here. Each string is a paragraph.
     */
    paragraphs: [
      'Manam ippudu kalisi lemu… kani naa heart lo nee place eppudu maaraledu.',
      'Mana story ekkada aagipoyina, nuvvu naa life lo oka beautiful chapter ga eppatiki untav.',
      'Ee birthday ki naa okka wish… nuvvu eppudu happy ga undali, nee smile eppudu alane undali. ❤️',
    ],
    closing: 'With lots of love,',
    finale: 'Happy Birthday, Nanna… ❤️',
  },
} as const

export const SCENE_IDS = [
  'opening',
  'question',
  'game',
  'stolen',
  'memories',
  'song',
  'boxes',
  'cake',
  'letter',
] as const

export type SceneId = (typeof SCENE_IDS)[number]
export type AmbientMood =
  | 'dawn'
  | 'playful'
  | 'cinematic'
  | 'warm'
  | 'night'
  | 'festive'
  | 'paper'
