export const img = (prompt, size = 'landscape_4_3') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

export const courtPhoto = (name, sport) =>
  img(
    `professional photograph of ${name} in Hong Kong, ${sport === 'pickleball' ? 'pickleball' : 'tennis'} court, bright daylight, well maintained playing surface, green urban surroundings, realistic, high resolution`
  )

export const listingPhoto = (title) =>
  img(
    `clean marketplace product photograph of ${title}, soft studio lighting, neutral light background, sharp focus, realistic, high resolution`,
    'square'
  )

export const sports = ['tennis', 'pickleball', 'both']
export const districts = ['cw', 'wc', 'ea', 'so', 'ytm', 'ssp', 'kc', 'wts', 'kt', 'kwts', 'tw', 'tm', 'yl', 'no', 'tp', 'st', 'sk', 'sai', 'is']
export const surfaces = ['hard', 'clay', 'grass', 'artificial', 'cushion']
export const environments = ['indoor', 'outdoor', 'covered']
export const levels = ['1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0']
export const playStyles = ['singles', 'doubles', 'both']
export const groupTypes = ['public', 'invite']
export const gearCategories = ['rackets', 'strings', 'shoes', 'apparel', 'bags', 'courtEquip', 'accessories', 'other']
export const conditions = ['new', 'likeNew', 'lightlyUsed', 'heavilyUsed']
export const listingStatuses = ['available', 'sold']

export const members = [
  {
    id: 'm1',
    name: 'Ken Wong',
    nameZh: '黃健明',
    role: 'admin',
    email: 'ken.wong@example.com',
    phone: '+852 9123 4567',
    sports: ['tennis', 'pickleball'],
    level: '3.5',
    playStyle: 'both',
    district: 'kc',
    bio: { en: 'Weekend player who loves a good rally. Happy to hit at Kowloon Tsai or Victoria Park.', zh: '週末球員,最愛打好波。樂於到九龍仔或維園打球。' },
    joined: '2024-03-12',
    favCourts: ['c1', 'c4'],
    connections: ['m2', 'm3', 'm5', 'm7'],
    avatarColor: '#3f6d4e',
    isMe: true
  },
  {
    id: 'm2',
    name: 'Sarah Chan',
    nameZh: '陳思慧',
    email: 'sarah.chan@example.com',
    phone: '+852 9234 5678',
    sports: ['tennis'],
    level: '4.5',
    playStyle: 'singles',
    district: 'st',
    bio: { en: 'Former junior player, coach part-time at Sha Tin. Looking for competitive matches.', zh: '前青少年球員,沙田兼職教練。尋找高水平對賽。' },
    joined: '2023-11-02',
    favCourts: ['c5'],
    connections: ['m1', 'm6'],
    avatarColor: '#965fd4',
    isCoach: true,
    coachExp: 3,
    coachCertifications: [
      { name: { en: 'Tennis Hong Kong Level 2 Coach', zh: '香港網球總會二級教練' }, year: 2022 },
      { name: { en: 'ITF Play & Stay Certified', zh: 'ITF Play & Stay 認證' }, year: 2021 }
    ],
    coachingAreas: ['technique', 'tactics', 'fitness'],
    availableForLessons: true,
    pricing: { en: '$350-450/hr', zh: '$350-450/小時' }
  },
  {
    id: 'm3',
    name: 'David Li',
    nameZh: '李浩賢',
    email: 'david.li@example.com',
    phone: '+852 9345 6789',
    sports: ['pickleball'],
    level: '2.0',
    playStyle: 'doubles',
    district: 'ytm',
    bio: { en: 'New to pickleball, loving it! Open to drills and social games.', zh: '匹克球新手,非常喜歡!想找人練習及打友誼賽。' },
    joined: '2024-06-20',
    favCourts: ['c3'],
    connections: ['m1', 'm8'],
    avatarColor: '#e76f51'
  },
  {
    id: 'm4',
    name: 'Emily Ng',
    nameZh: '吳詠恩',
    email: 'emily.ng@example.com',
    phone: '+852 9456 7890',
    sports: ['tennis', 'pickleball'],
    level: '6.0',
    playStyle: 'both',
    district: 'wc',
    bio: { en: 'Played university tennis, now into pickleball tournaments. Always up for a challenge.', zh: '大學網球隊出身,現活躍於匹克球比賽。隨時接受挑戰。' },
    joined: '2023-08-15',
    favCourts: ['c2', 'c4'],
    connections: ['m5'],
    avatarColor: '#2e9e8f'
  },
  {
    id: 'm5',
    name: 'Jason Cheung',
    nameZh: '張子軒',
    email: 'jason.cheung@example.com',
    phone: '+852 9567 8901',
    sports: ['tennis'],
    level: '3.0',
    playStyle: 'singles',
    district: 'tw',
    bio: { en: 'Tsuen Wan local, free most evenings. Prefer hard courts.', zh: '荃灣街坊,平日晚上多數有空。偏好硬地場。' },
    joined: '2024-01-08',
    favCourts: ['c11'],
    connections: ['m1', 'm4'],
    avatarColor: '#e9a23b'
  },
  {
    id: 'm6',
    name: 'Grace Ho',
    nameZh: '何芷晴',
    email: 'grace.ho@example.com',
    phone: '+852 9678 9012',
    sports: ['tennis'],
    level: '4.5',
    playStyle: 'singles',
    district: 'so',
    bio: { en: 'South side player. Morning sessions at Aberdeen are my favourite.', zh: '南區球員。最鍾意朝早喺香港仔打波。' },
    joined: '2023-05-30',
    favCourts: ['c9'],
    connections: ['m2'],
    avatarColor: '#d9534f'
  },
  {
    id: 'm7',
    name: 'Michael Lau',
    nameZh: '劉志強',
    email: 'michael.lau@example.com',
    phone: '+852 9789 0123',
    sports: ['pickleball'],
    level: '3.0',
    playStyle: 'doubles',
    district: 'kt',
    bio: { en: 'Kowloon East pickleball regular at KITEC. Organiser of Monday socials.', zh: '九龍東匹克球常客,九展常客。逢星期一友誼賽發起人。' },
    joined: '2024-02-14',
    favCourts: ['c3'],
    connections: ['m1', 'm3'],
    avatarColor: '#734f9a'
  },
  {
    id: 'm8',
    name: 'Ava Lam',
    nameZh: '林曉彤',
    email: 'ava.lam@example.com',
    phone: '+852 9890 1234',
    sports: ['tennis', 'pickleball'],
    level: '2.0',
    playStyle: 'both',
    district: 'tp',
    bio: { en: 'Just started playing both sports this year. Looking for friendly partners!', zh: '今年先開始接觸兩種運動。想搵友好波友一齊玩!' },
    joined: '2024-07-01',
    favCourts: ['c16'],
    connections: ['m3'],
    avatarColor: '#8bd450'
  },
  {
    id: 'm9',
    name: 'Eric Tsui',
    nameZh: '徐國樑',
    email: 'eric.tsui@example.com',
    phone: '+852 9901 2345',
    sports: ['tennis'],
    level: '1.5',
    playStyle: 'singles',
    district: 'is',
    bio: { en: 'Tung Chung player, drives to town for weekend matches.', zh: '東涌球員,週末出市區打波。' },
    joined: '2024-04-22',
    favCourts: ['c17'],
    connections: [],
    avatarColor: '#3f6d4e'
  },
  {
    id: 'm10',
    name: 'Rachel Yip',
    nameZh: '葉曉嵐',
    email: 'rachel.yip@example.com',
    phone: '+852 9012 3456',
    sports: ['pickleball'],
    level: '4.0',
    playStyle: 'doubles',
    district: 'cw',
    bio: { en: 'Pickleball instructor at a local club. DM me for coaching slots.', zh: '本地球會匹克球教練。想學波可 PM 我。' },
    joined: '2023-09-10',
    favCourts: ['c7'],
    connections: [],
    isCoach: true,
    avatarColor: '#2e9e8f',
    coachExp: 5,
    coachCertifications: [
      { name: { en: 'US Pickleball Ambassador', zh: '美國匹克球大使' }, year: 2020 },
      { name: { en: 'HK Pickleball Association Level 1', zh: '香港匹克球協會一級' }, year: 2019 }
    ],
    coachingAreas: ['beginners', 'technique', 'strategy'],
    availableForLessons: true,
    pricing: { en: '$300-400/hr', zh: '$300-400/小時' }
  },
  {
    id: 'm11',
    name: 'Tom Yeung',
    nameZh: '楊國威',
    email: 'tom.yeung@example.com',
    phone: '+852 9123 4567',
    sports: ['tennis', 'pickleball'],
    level: '4.5',
    playStyle: 'both',
    district: 'tm',
    bio: { en: 'Tuen Mun weekend warrior. Both sports, happy to travel.', zh: '屯門週末戰士。兩種運動都玩,樂意跨區。' },
    joined: '2023-12-05',
    favCourts: ['c13'],
    connections: [],
    avatarColor: '#e76f51',
    isCoach: true,
    coachExp: 2,
    coachCertifications: [
      { name: { en: 'LTA Youth Coach Award', zh: 'LTA 青少年教練獎項' }, year: 2023 }
    ],
    coachingAreas: ['youth', 'beginners', 'group'],
    availableForLessons: true,
    pricing: { en: '$280-350/hr', zh: '$280-350/小時' }
  },
  {
    id: 'm12',
    name: 'Nicole Fu',
    nameZh: '傅美玲',
    email: 'nicole.fu@example.com',
    phone: '+852 9234 5678',
    sports: ['tennis'],
    level: '3.0',
    playStyle: 'singles',
    district: 'ea',
    bio: { en: 'Eastern district player. Chai Wan courts are my home ground.', zh: '港島東球員,柴灣球場係我主場。' },
    joined: '2024-05-18',
    favCourts: ['c18'],
    connections: [],
    avatarColor: '#e9a23b'
  }
]

export const courts = [
  {
    id: 'c1',
    name: { en: 'Victoria Park Tennis Courts', zh: '維多利亞公園網球場' },
    district: 'wc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2817,
    lng: 114.1898,
    address: { en: 'Victoria Park, Causeway Bay, Hong Kong Island', zh: '香港島銅鑼灣維多利亞公園' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'proShop', 'water'],
    nearestMtr: { en: 'Causeway Bay Station (Exit E)', zh: '銅鑼灣站(E 出口)' },
    about: {
      en: 'Iconic public tennis complex with 8 floodlit hard courts in the heart of Causeway Bay. Popular with players of all levels; booking required via the LCSD Leisure Link system.',
      zh: '銅鑼灣中心地帶的標誌性公眾網球場,設有 8 個附泛光燈的硬地球場。各水平球員都喜愛這裡;需透過康文署「康體通」預約。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Victoria Park Tennis Courts', 'tennis'),
      img('close view of red brick clubhouse and eight blue hard tennis courts at victoria park hong kong, aerial, sunny', 'landscape_16_9')
    ]
  },
  {
    id: 'c2',
    name: { en: 'Hong Kong Tennis Centre', zh: '香港網球中心' },
    district: 'wc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2785,
    lng: 114.1834,
    address: { en: '18 Cotton Tree Drive, Wan Chai, Hong Kong Island', zh: '香港島灣仔棉樹徑 18 號' },
    lights: true,
    free: false,
    isPublic: false,
    opening: { en: '06:30 – 23:30', zh: '06:30 – 23:30' },
    amenities: ['shower', 'locker', 'proShop', 'water', 'cafe', 'stringing'],
    nearestMtr: { en: 'Wan Chai Station (Exit A3)', zh: '灣仔站(A3 出口)' },
    about: {
      en: 'Hong Kong’s flagship tennis venue, home of the Hong Kong Tennis Open. 14 outdoor courts and a show court with stadium seating. Membership and guest passes available.',
      zh: '香港旗艦網球場地,香港網球公開賽主場。設有 14 個室外場地及一個附看台的表演場。提供會籍及嘉賓證。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Hong Kong Tennis Centre', 'tennis'),
      img('stadium show court at hong kong tennis centre with crowd seating and floodlights at dusk', 'landscape_16_9')
    ]
  },
  {
    id: 'c3',
    name: { en: 'KITEC Pickleball Arena', zh: '九展匹克球館' },
    district: 'kt',
    sport: 'pickleball',
    surface: 'cushion',
    environment: 'indoor',
    lat: 22.3229,
    lng: 114.2076,
    address: { en: '1 Trademart Drive, Kowloon Bay, Kowloon', zh: '九龍九龍灣展貿徑 1 號' },
    lights: true,
    free: false,
    isPublic: false,
    opening: { en: '09:00 – 23:00', zh: '09:00 – 23:00' },
    amenities: ['shower', 'water', 'rental', 'cafe', 'aircon'],
    nearestMtr: { en: 'Kowloon Bay Station (Exit A)', zh: '九龍灣站(A 出口)' },
    about: {
      en: 'Purpose-built indoor pickleball arena in Kowloon Bay with 6 cushioned courts, rental paddles and evening socials every day. The busiest pickleball hub in Kowloon East.',
      zh: '九龍灣專為匹克球而設的室內場館,設有 6 個緩衝地場、球拍租借服務,每晚都有友誼賽。九龍東最熱鬧的匹克球集中地。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('KITEC Pickleball Arena indoor', 'pickleball'),
      img('indoor pickleball arena with six cushioned courts and players warming up, bright modern lighting', 'landscape_16_9')
    ]
  },
  {
    id: 'c4',
    name: { en: 'South China AA Courts', zh: '南華會球場' },
    district: 'wc',
    sport: 'both',
    surface: 'hard',
    environment: 'covered',
    lat: 22.2802,
    lng: 114.1886,
    address: { en: '88 Caroline Hill Road, Causeway Bay, Hong Kong Island', zh: '香港島銅鑼灣加路連山道 88 號' },
    lights: true,
    free: false,
    isPublic: false,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'proShop', 'water', 'cafe', 'stringing'],
    nearestMtr: { en: 'Causeway Bay Station (Exit A)', zh: '銅鑼灣站(A 出口)' },
    about: {
      en: 'Historic club with covered tennis courts and weekend pickleball sessions. One of the few covered venues on Hong Kong Island — perfect for rainy-season play.',
      zh: '歷史悠久的體育會,設有有蓋網球場,週末亦有匹克球時段。港島少數有蓋場地之一 — 雨季打球的最佳選擇。'
    },
    claimedBy: 'm1',
    photos: [
      courtPhoto('South China AA covered courts', 'tennis'),
      img('covered tennis courts under translucent roof at a historic hong kong sports club', 'landscape_16_9')
    ]
  },
  {
    id: 'c5',
    name: { en: 'Sha Tin Sports Ground Courts', zh: '沙田運動場球場' },
    district: 'st',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3818,
    lng: 114.1977,
    address: { en: '1 Yuen Wo Road, Sha Tin, New Territories', zh: '新界沙田源禾路 1 號' },
    lights: true,
    free: true,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'water'],
    nearestMtr: { en: 'Sha Tin Station', zh: '沙田站' },
    about: {
      en: 'Free public courts next to Sha Tin Sports Ground. Often busy on weekends; weekday mornings are usually quiet.',
      zh: '沙田運動場旁的公眾免費球場。週末通常人多,平日早上較清靜。'
    },
    claimedBy: 'm2',
    photos: [
      courtPhoto('Sha Tin Sports Ground tennis courts', 'tennis'),
      img('public tennis courts next to a stadium running track in sha tin hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c6',
    name: { en: 'Bowen Road Tennis Courts', zh: '寶雲道網球場' },
    district: 'cw',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2692,
    lng: 114.163,
    address: { en: 'Bowen Road, Mid-Levels, Hong Kong Island', zh: '香港島半山寶雲道' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water', 'view'],
    nearestMtr: { en: 'Admiralty Station (15 min walk)', zh: '金鐘站(步行 15 分鐘)' },
    about: {
      en: 'Scenic courts along Bowen Road with views over Happy Valley. A hidden gem for early-morning sessions.',
      zh: '寶雲道沿路的景觀球場,可眺望跑馬地。晨早時段打波的隱藏寶地。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Bowen Road Tennis Courts', 'tennis'),
      img('tennis courts on a hillside road overlooking horse racing valley hong kong, morning light', 'landscape_16_9')
    ]
  },
  {
    id: 'c7',
    name: { en: 'King’s Park Tennis Courts', zh: '京士柏網球場' },
    district: 'ytm',
    sport: 'tennis',
    surface: 'clay',
    environment: 'outdoor',
    lat: 22.3056,
    lng: 114.169,
    address: { en: 'King’s Park, Ho Man Tin, Kowloon', zh: '九龍何文田京士柏' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:30', zh: '07:00 – 22:30' },
    amenities: ['shower', 'water', 'locker'],
    nearestMtr: { en: 'Yau Ma Tei Station (Exit A2)', zh: '油麻地站(A2 出口)' },
    about: {
      en: 'Rare clay courts in Kowloon with a friendly club atmosphere. Clay purists love the softer bounce on the knees.',
      zh: '九龍罕見的紅土球場,球會氣氛友善。鍾情紅土的球友最愛這裡較柔和的反彈。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Kings Park clay tennis courts', 'tennis'),
      img('red clay tennis courts at kings park kowloon with green surround netting', 'landscape_16_9')
    ]
  },
  {
    id: 'c8',
    name: { en: 'Choi Hung Road Playground Courts', zh: '彩虹道遊樂場網球場' },
    district: 'wts',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3346,
    lng: 114.2103,
    address: { en: 'Choi Hung Road, San Po Kong, Kowloon', zh: '九龍新蒲崗彩虹道' },
    lights: true,
    free: true,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Diamond Hill Station (Exit C1)', zh: '鑽石山站(C1 出口)' },
    about: {
      en: 'Free public courts in San Po Kong. Popular spot for local juniors in the afternoons.',
      zh: '新蒲崗免費公眾球場。下午時段是本地青少年的熱門練習地點。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Choi Hung Road Playground tennis courts', 'tennis'),
      img('neighbourhood tennis courts at a public playground in kowloon hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c9',
    name: { en: 'Aberdeen Tennis & Squash Centre', zh: '香港仔網球及壁球中心' },
    district: 'so',
    sport: 'tennis',
    surface: 'hard',
    environment: 'covered',
    lat: 22.2479,
    lng: 114.1526,
    address: { en: '1 Wong Chuk Hang Road, Aberdeen, Hong Kong Island', zh: '香港島香港仔黃竹坑道 1 號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'cafe'],
    nearestMtr: { en: 'Wong Chuk Hang Station', zh: '黃竹坑站' },
    about: {
      en: 'Government sports centre with covered courts — ideal in all weather. Squash and table tennis on site too.',
      zh: '政府體育中心,設有蓋球場 — 全天候之選。場館內另有壁球及乒乓球設施。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Aberdeen Tennis and Squash Centre', 'tennis'),
      img('covered tennis courts inside a hong kong government sports centre with squash courts signage', 'landscape_16_9')
    ]
  },
  {
    id: 'c10',
    name: { en: 'Cyberport Pickleball Courts', zh: '數碼港匹克球場' },
    district: 'so',
    sport: 'pickleball',
    surface: 'cushion',
    environment: 'outdoor',
    lat: 22.2624,
    lng: 114.1292,
    address: { en: '100 Cyberport Road, Pok Fu Lam, Hong Kong Island', zh: '香港島薄扶林數碼港道 100 號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '08:00 – 22:00', zh: '08:00 – 22:00' },
    amenities: ['water', 'cafe', 'seaView'],
    nearestMtr: { en: 'Pok Fu Lam (bus 30X)', zh: '薄扶林(巴士 30X)' },
    about: {
      en: 'Scenic pickleball courts by the sea at Cyberport, next to the waterfront promenade. Great for evening games with a view.',
      zh: '數碼港海濱旁的匹克球場,景觀一流。傍晚時段邊打波邊睇海景,非常寫意。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Cyberport pickleball courts by the sea', 'pickleball'),
      img('pickleball courts next to the seafront promenade at cyberport hong kong, ocean view', 'landscape_16_9')
    ]
  },
  {
    id: 'c11',
    name: { en: 'Tsuen Wan West Park Courts', zh: '荃灣西公園球場' },
    district: 'tw',
    sport: 'both',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3696,
    lng: 114.112,
    address: { en: 'Tsuen Wan West Park, Tsuen Wan, New Territories', zh: '新界荃灣荃灣西公園' },
    lights: true,
    free: true,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water', 'seaView'],
    nearestMtr: { en: 'Tsuen Wan West Station', zh: '荃灣西站' },
    about: {
      en: 'Free courts in Tsuen Wan West Park with harbour views. Both tennis and pickleball lines are painted.',
      zh: '荃灣西公園免費球場,望住海景打波。場地同時劃有網球及匹克球線。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tsuen Wan West Park courts', 'both'),
      img('sports courts in a waterfront park in tsuen wan hong kong, harbour view', 'landscape_16_9')
    ]
  },
  {
    id: 'c12',
    name: { en: 'Tuen Mun Sports Centre Pickleball', zh: '屯門體育館匹克球場' },
    district: 'tm',
    sport: 'pickleball',
    surface: 'cushion',
    environment: 'indoor',
    lat: 22.392,
    lng: 113.976,
    address: { en: '6 Hoi Wong Road, Tuen Mun, New Territories', zh: '新界屯門海皇路 6 號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '08:00 – 22:30', zh: '08:00 – 22:30' },
    amenities: ['shower', 'aircon', 'water', 'locker'],
    nearestMtr: { en: 'Tuen Mun Station', zh: '屯門站' },
    about: {
      en: 'Air-conditioned indoor pickleball courts in Tuen Mun Sports Centre. A growing evening league runs every Wednesday.',
      zh: '屯門體育館的冷氣匹克球場。逢星期三晚上有漸受歡迎的聯賽時段。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tuen Mun Sports Centre indoor pickleball', 'pickleball'),
      img('indoor sports centre pickleball courts in tuen mun hong kong, air conditioned hall', 'landscape_16_9')
    ]
  },
  {
    id: 'c13',
    name: { en: 'Yuen Long Town Hall Courts', zh: '元朗大會堂球場' },
    district: 'yl',
    sport: 'tennis',
    surface: 'artificial',
    environment: 'outdoor',
    lat: 22.443,
    lng: 114.036,
    address: { en: 'Yuen Long Town Hall, 6 Tung Koon Road, Yuen Long', zh: '元朗東莞徑 6 號元朗大會堂' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Yuen Long Station', zh: '元朗站' },
    about: {
      en: 'Artificial-grass tennis courts in the heart of Yuen Long. Gentle on the joints and well shaded in the afternoon.',
      zh: '元朗市中心的人造草網球場,對關節較友善,下午有樹蔭。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Yuen Long Town Hall artificial grass tennis courts', 'tennis'),
      img('artificial grass tennis courts in yuen long hong kong town area', 'landscape_16_9')
    ]
  },
  {
    id: 'c14',
    name: { en: 'Tai Po Sports Centre Courts', zh: '大埔體育館球場' },
    district: 'tp',
    sport: 'both',
    surface: 'cushion',
    environment: 'indoor',
    lat: 22.445,
    lng: 114.167,
    address: { en: '21 Ting Kok Road, Tai Po, New Territories', zh: '新界大埔汀角路 21 號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '08:00 – 22:30', zh: '08:00 – 22:30' },
    amenities: ['shower', 'aircon', 'water', 'locker'],
    nearestMtr: { en: 'Tai Po Market Station', zh: '大埔墟站' },
    about: {
      en: 'Multi-purpose indoor hall that hosts tennis and pickleball sessions. Cushioned flooring ideal for beginners.',
      zh: '多功能室內場館,定期舉辦網球及匹克球時段。緩衝地板適合初學者。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tai Po Sports Centre indoor courts', 'both'),
      img('indoor multi-purpose sports hall in tai po hong kong with cushioned flooring', 'landscape_16_9')
    ]
  },
  {
    id: 'c15',
    name: { en: 'Kai Tak Sports Park Courts', zh: '啟德體育園球場' },
    district: 'kc',
    sport: 'both',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3306,
    lng: 114.2045,
    address: { en: 'Kai Tak Sports Park, Kai Tak, Kowloon', zh: '九龍啟德啟德體育園' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '06:30 – 23:00', zh: '06:30 – 23:00' },
    amenities: ['shower', 'locker', 'proShop', 'water', 'cafe', 'stringing'],
    nearestMtr: { en: 'Kai Tak Station', zh: '啟德站' },
    about: {
      en: 'Brand-new world-class sports park in Kai Tak with premium courts for tennis and pickleball, alongside the main stadium.',
      zh: '啟德全新世界級體育園,提供網球及匹克球高質場地,毗鄰主場館。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Kai Tak Sports Park courts', 'both'),
      img('modern sports park in kai tak hong kong with stadium in background, new courts in foreground', 'landscape_16_9')
    ]
  },
  {
    id: 'c16',
    name: { en: 'Tseung Kwan O Sports Ground', zh: '將軍澳運動場' },
    district: 'sk',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3069,
    lng: 114.259,
    address: { en: '10 Po Hong Road, Tseung Kwan O, New Territories', zh: '新界將軍澳寶康路 10 號' },
    lights: true,
    free: true,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water', 'parking'],
    nearestMtr: { en: 'Tseung Kwan O Station (Exit B)', zh: '將軍澳站(B 出口)' },
    about: {
      en: 'Free outdoor tennis courts beside Tseung Kwan O Sports Ground, popular with the local running and tennis crowd.',
      zh: '將軍澳運動場旁的免費室外網球場,深受區內跑友及波友歡迎。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tseung Kwan O Sports Ground tennis courts', 'tennis'),
      img('tennis courts next to a sports stadium in tseung kwan o hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c17',
    name: { en: 'Tung Chung Park Courts', zh: '東涌公園球場' },
    district: 'is',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.288,
    lng: 113.942,
    address: { en: 'Tung Chung Park, Tung Chung, Lantau Island', zh: '大嶼山東涌東涌公園' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Tung Chung Station (Exit C)', zh: '東涌站(C 出口)' },
    about: {
      en: 'The main public tennis venue on Lantau Island, a short walk from Tung Chung MTR. Mountain views from every court.',
      zh: '大嶼山主要的公眾網球場地,距離東涌港鐵站僅數分鐘步程。每個場都可望到山景。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tung Chung Park tennis courts', 'tennis'),
      img('tennis courts in a lantau island park with mountains behind, hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c18',
    name: { en: 'Chai Wan Sports Centre Courts', zh: '柴灣體育館球場' },
    district: 'ea',
    sport: 'pickleball',
    surface: 'cushion',
    environment: 'indoor',
    lat: 22.2649,
    lng: 114.242,
    address: { en: '2 Tai Hong Street, Chai Wan, Hong Kong Island', zh: '香港島柴灣大康街 2 號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '08:00 – 22:30', zh: '08:00 – 22:30' },
    amenities: ['shower', 'aircon', 'water'],
    nearestMtr: { en: 'Chai Wan Station (Exit C)', zh: '柴灣站(C 出口)' },
    about: {
      en: 'Indoor pickleball sessions at Chai Wan Sports Centre, part of the LCSD sports programme. Friendly for absolute beginners.',
      zh: '柴灣體育館的室內匹克球時段,屬康文署體育計劃一部分。對初學者非常友善。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Chai Wan Sports Centre pickleball', 'pickleball'),
      img('indoor pickleball court at chai wan sports centre hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c19',
    name: { en: 'Quarry Bay Park', zh: '鰂魚涌公園' },
    district: 'ea',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2868,
    lng: 114.2169,
    address: { en: 'Near Hoi Tai Street, Quarry Bay, Hong Kong Island', zh: '香港島鰂魚涌近海堤街' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'water', 'locker'],
    nearestMtr: { en: 'Quarry Bay Station', zh: '鰂魚涌站' },
    about: {
      en: 'LCSD outdoor courts with 8 hard courts in Quarry Bay. Babycare room available for families.',
      zh: '康文署鰂魚涌戶外硬地球場,共8個球場。設有育嬰間供家庭使用。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Quarry Bay Park tennis courts', 'tennis'),
      img('LCSD public tennis courts in quarry bay park hong kong island', 'landscape_16_9')
    ]
  },
  {
    id: 'c20',
    name: { en: 'Sai Wan Ho Playground', zh: '西灣河遊樂場' },
    district: 'ea',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2826,
    lng: 114.2331,
    address: { en: 'Lei King Road, Lei King Wan, Sai Wan Ho, Hong Kong Island', zh: '香港島西灣河鯉景灣鯉景道' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'water'],
    nearestMtr: { en: 'Sai Wan Ho Station', zh: '西灣河站' },
    about: {
      en: 'LCSD outdoor courts at Sai Wan Ho Playground with 4 hard courts. Popular with local residents.',
      zh: '康文署西灣河遊樂場戶外球場,共4個硬地球場。深受區內居民歡迎。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Sai Wan Ho Playground tennis courts', 'tennis'),
      img('LCSD tennis courts at sai wan ho playground hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c21',
    name: { en: 'Cheung Chau Park', zh: '長洲公園' },
    district: 'is',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.2078,
    lng: 114.0288,
    address: { en: 'Cheung Shek Road, Cheung Chau, Lantau Island', zh: '大嶼山長洲長碩路' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Ferry Pier (Central to Cheung Chau)', zh: '渡輪碼頭(中環至長洲)' },
    about: {
      en: 'The only public tennis courts on Cheung Chau island. 3 hard courts with changing rooms and lockers. Popular during festivals.',
      zh: '長洲唯一的公眾網球場。3個硬地球場,設有更衣室及貯物櫃。節日期間特別熱鬧。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Cheung Chau Park tennis courts', 'tennis'),
      img('public tennis courts on cheung chau island hong kong near the beach', 'landscape_16_9')
    ]
  },
  {
    id: 'c22',
    name: { en: 'Ho Man Tin Sports Centre', zh: '何文田體育館' },
    district: 'kc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3027,
    lng: 114.1765,
    address: { en: 'No.1 Chung Yee Street, Ho Man Tin, Kowloon', zh: '九龍何文田忠義街一號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'parking'],
    nearestMtr: { en: 'Ho Man Tin Station', zh: '何文田站' },
    about: {
      en: 'LCSD indoor sports centre with 2 tennis courts. Parking available. Also has table tennis and fitness room.',
      zh: '康文署室內體育館,設有2個網球場。提供停車場。另有乒乓球室及健身室。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Ho Man Tin Sports Centre tennis courts', 'tennis'),
      img('indoor LCSD sports centre tennis courts in ho man tin kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c23',
    name: { en: 'Hoi Sham Park', zh: '海心公園' },
    district: 'kc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3008,
    lng: 114.1928,
    address: { en: 'Yuk Yat Street, To Kwa Wan, Kowloon', zh: '九龍土瓜灣旭日街' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'To Kwa Wan Station', zh: '土瓜灣站' },
    about: {
      en: 'LCSD outdoor courts in To Kwa Wan with 4 hard courts. Park setting with other sports facilities nearby.',
      zh: '康文署土瓜灣戶外球場,共4個硬地球場。園內另有其他球類設施。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Hoi Sham Park tennis courts', 'tennis'),
      img('outdoor tennis courts at hoi sham park to kwa wan kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c24',
    name: { en: 'Junction Road Park', zh: '聯合道公園' },
    district: 'kc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3277,
    lng: 114.1825,
    address: { en: '195 Junction Road, Kowloon City, Kowloon', zh: '九龍九龍城聯合道195號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'view'],
    nearestMtr: { en: 'Kowloon City Station / Lok Fu Station', zh: '九龍城站 / 樂富站' },
    about: {
      en: 'LCSD courts at Junction Road Park in Kowloon City with 6 hard courts. Scenic jogging track nearby.',
      zh: '康文署九龍城聯合道公園球場,共6個硬地球場。園內設有緩跑徑。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Junction Road Park tennis courts', 'tennis'),
      img('tennis courts at junction road park kowloon city near the track', 'landscape_16_9')
    ]
  },
  {
    id: 'c25',
    name: { en: 'Tin Kwong Road Tennis Court', zh: '天光道網球場' },
    district: 'kc',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3134,
    lng: 114.1731,
    address: { en: 'Tin Kwong Road, Kowloon City, Kowloon', zh: '九龍九龍城天光道' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Shek Kip Mei Station', zh: '石硤尾站' },
    about: {
      en: 'Dedicated LCSD tennis venue on Tin Kwong Road near the racecourse. Well-maintained hard courts.',
      zh: '康文署天光道專用網球場,靠近馬場。保養良好的硬地球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tin Kwong Road tennis courts', 'tennis'),
      img('LCSD tennis courts on tin kwong road near the racecourse kowloon city', 'landscape_16_9')
    ]
  },
  {
    id: 'c26',
    name: { en: 'Shun Lee Tsuen Sports Centre', zh: '順利邨體育館' },
    district: 'kt',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3137,
    lng: 114.2553,
    address: { en: 'Shun Lee Tsuen, Kwun Tong, Kowloon', zh: '九龍觀塘順利邨' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Shun Tin Station', zh: '順天站' },
    about: {
      en: 'LCSD indoor sports centre in Shun Lee Tsuen with multi-purpose courts. Air-conditioned hall.',
      zh: '康文署順利邨室內體育館,設有多用途球場。冷氣開放。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Shun Lee Tsuen Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre courts in shan lee tsuen kwun tong kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c27',
    name: { en: 'Chun Wah Road Sports Centre', zh: '振華道體育館' },
    district: 'kt',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3255,
    lng: 114.2316,
    address: { en: 'Chun Wah Road, Ngau Tau Kok, Kowloon', zh: '九龍牛頭角振華道' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Ngau Tau Kok Station', zh: '牛頭角站' },
    about: {
      en: 'LCSD indoor courts in Ngau Tau Kok. Convenient location near the MTR with changing facilities.',
      zh: '康文署牛頭角室內球場。港鐵站附近,位置方便,設有更衣設施。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Chun Wah Road Sports Centre indoor courts', 'tennis'),
      img('indoor tennis courts at chun wah road sports centre ngau tau kok kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c28',
    name: { en: 'Lei Yue Mun Sports Centre', zh: '鯉魚門體育館' },
    district: 'kt',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.2846,
    lng: 114.2372,
    address: { en: 'Lei Yue Mun, Kwun Tong, Kowloon', zh: '九龍觀塘鯉魚門' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'seaView'],
    nearestMtr: { en: 'Yau Tong Station', zh: '油塘站' },
    about: {
      en: 'LCSD sports centre near Lei Yue Mun seafood village with sea views. Unique coastal location.',
      zh: '康文署鯉魚門體育館,靠近鯉魚門海鮮街,面海景。獨特的海岸線位置。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Lei Yue Mun Sports Centre tennis courts', 'tennis'),
      img('LCSD sports centre tennis courts near lei yue mun seafood village kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c29',
    name: { en: 'Fanling Recreation Ground', zh: '粉嶺遊樂場' },
    district: 'no',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.4925,
    lng: 114.1389,
    address: { en: 'Jockey Club Road, Fanling, New Territories', zh: '新界粉嶺馬會道' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Fanling Station', zh: '粉嶺站' },
    about: {
      en: 'Main public tennis venue in the North District. 6 hard courts maintained by LCSD.',
      zh: '北區主要的公眾網球場地。6個硬地球場,由康文署管理。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Fanling Recreation Ground tennis courts', 'tennis'),
      img('public tennis courts at fanling recreation ground in north district hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c30',
    name: { en: 'Sheung Shui Water Works', zh: '上水流動網球場', },
    district: 'no',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.5072,
    lng: 114.1277,
    address: { en: 'Sheung Shui, New Territories', zh: '新界上水' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Sheung Shui Station', zh: '上水站' },
    about: {
      en: 'Compact LCSD tennis venue in Sheung Shui serving the border community.',
      zh: '康文署上水網球場,為邊境社區服務。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Sheung Shui tennis courts', 'tennis'),
      img('public tennis courts in sheung shui new territories hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c31',
    name: { en: 'Sai Kung Tennis Courts', zh: '西貢網球場' },
    district: 'sai',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3125,
    lng: 114.2636,
    address: { en: 'Sai Kung Town Centre, New Territories', zh: '新界西貢市中心' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Sai Kung (via bus 92 from Diamond Hill)', zh: '西貢(鑽石山站乘92號巴士)' },
    about: {
      en: 'Main tennis venue in Sai Kung town. 4 hard courts popular with weekend visitors from the city.',
      zh: '西貢市中心主要網球場地。4個硬地球場,深受週末從市區來的球友歡迎。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Sai Kung tennis courts', 'tennis'),
      img('public tennis courts in sai kung town centre new territories hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c32',
    name: { en: 'Ma On Shan Recreation Ground', zh: '馬鞍山休憩用地' },
    district: 'st',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3585,
    lng: 114.2259,
    address: { en: 'Ma On Shan, Sha Tin, New Territories', zh: '新界沙田馬鞍山' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Ma On Shan Station', zh: '馬鞍山站' },
    about: {
      en: 'Free public courts in Ma On Shan. Non-smoking venue popular with families.',
      zh: '馬鞍山免費公眾球場。禁止吸煙,深受家庭球友歡迎。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Ma On Shan Recreation Ground tennis courts', 'tennis'),
      img('public tennis courts at ma on shan recreation ground sha tin new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c33',
    name: { en: 'Siu Lek Yuen Road Playground', zh: '小瀝源道遊樂場' },
    district: 'st',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3738,
    lng: 114.1878,
    address: { en: 'No. 1 Siu Lek Yuen Road, Sha Tin, New Territories', zh: '新界沙田小瀝源道一號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'City One Station / Sha Tin Station', zh: '第一城站 / 沙田站' },
    about: {
      en: 'LCSD courts in Sha Tin with 4 hard courts. Good floodlighting for evening play.',
      zh: '康文署沙田球場,共4個硬地球場。泛光燈充足,適合晚間打球。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Siu Lek Yuen Road Playground tennis courts', 'tennis'),
      img('outdoor tennis courts at siu lek yuen road playground sha tin', 'landscape_16_9')
    ]
  },
  {
    id: 'c34',
    name: { en: 'Stanley Sports Centre', zh: '赤柱體育館' },
    district: 'so',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.2267,
    lng: 114.2178,
    address: { en: 'Stanley, Hong Kong Island', zh: '香港島赤柱' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water', 'seaView'],
    nearestMtr: { en: 'Stanley (via bus 6/6X/66 from Causeway Bay)', zh: '赤柱(銅鑼灣乘6/6X/66號巴士)' },
    about: {
      en: 'LCSD sports centre in Stanley with scenic seaside location. Indoor courts available.',
      zh: '康文署赤柱體育館,海傍位置景色優美。設有室內球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Stanley Sports Centre tennis courts', 'tennis'),
      img('LCSD sports centre tennis courts in stanley hong kong island with sea view', 'landscape_16_9')
    ]
  },
  {
    id: 'c35',
    name: { en: 'Apleichau Sports Centre', zh: '鴨脷洲體育館' },
    district: 'so',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.2415,
    lng: 114.1566,
    address: { en: 'Apleichau, Hong Kong Island', zh: '香港島鴨脷洲' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Apleichau (via minibus 37 from Causeway Bay)', zh: '鴨脷洲(銅鑼灣乘37號小巴)' },
    about: {
      en: 'LCSD sports centre serving the Ap Lei Chau community. Indoor hard courts.',
      zh: '康文署鴨脷洲體育館,為鴨脷洲社區服務。室內硬地球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Apleichau Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre courts at ap leichau island hong kong', 'landscape_16_9')
    ]
  },
  {
    id: 'c36',
    name: { en: 'Tai Po Tsai Park', zh: '大埔滘公園' },
    district: 'tp',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.4435,
    lng: 114.1763,
    address: { en: 'Tai Po Tsai, New Territories', zh: '新界大埔大埔滘' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water', 'parking'],
    nearestMtr: { en: 'University Station', zh: '大學站' },
    about: {
      en: 'Outdoor courts near the Tolo Harbour in Tai Po Tsai. Parking available for visitors.',
      zh: '大埔滘吐露港旁的戶外球場。提供停車位。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tai Po Tsai Park tennis courts', 'tennis'),
      img('outdoor tennis courts at tai po tsai park near tolo harbour new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c37',
    name: { en: 'Sha Tsui Road Playground', zh: '沙咀道遊樂場' },
    district: 'tw',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3703,
    lng: 114.1087,
    address: { en: '171-199 Sha Tsui Road, Tsuen Wan, New Territories', zh: '新界荃灣沙咀道171-199號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Tsuen Wan Station', zh: '荃灣站' },
    about: {
      en: 'LCSD courts in the heart of Tsuen Wan with 3 hard courts. Good for evening sessions.',
      zh: '康文署荃灣市中心球場,共3個硬地球場。晚間打球之選。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Sha Tsui Road Playground tennis courts', 'tennis'),
      img('outdoor tennis courts at sha tsui road playground tsuen wan new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c38',
    name: { en: 'Shing Mun Valley Park', zh: '城門谷公園' },
    district: 'tw',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3763,
    lng: 114.1205,
    address: { en: '21 Shing Mun Road, Tsuen Wan, New Territories', zh: '新界荃灣城門道21號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'view'],
    nearestMtr: { en: 'Tsuen Wan Station / Tai Wo Hau Station', zh: '荃灣站 / 大窩口站' },
    about: {
      en: 'Scenic LCSD venue in Shing Mun Valley Park with hills background and 2 hard courts.',
      zh: '康文署城門谷公園球場,背山面綠,共2個硬地球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Shing Mun Valley Park tennis courts', 'tennis'),
      img('tennis courts at shing mun valley park tsuen wan with hills background', 'landscape_16_9')
    ]
  },
  {
    id: 'c39',
    name: { en: 'Tsuen King Circuit Playground', zh: '荃景徑遊樂場' },
    district: 'tw',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3627,
    lng: 114.1133,
    address: { en: 'Tsuen King Circuit, Tsuen Wan, New Territories', zh: '新界荃灣荃景徑' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Tsuen Wan West Station', zh: '荃灣西站' },
    about: {
      en: 'LCSD courts on Tsuen King Circuit with 4 hard courts.',
      zh: '康文署荃景徑球場,共4個硬地球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tsuen King Circuit Playground tennis courts', 'tennis'),
      img('outdoor tennis courts at tsuen king circuit playground tsuen wan', 'landscape_16_9')
    ]
  },
  {
    id: 'c40',
    name: { en: 'Tsuen Wan Riviera Park', zh: '荃灣海濱花園' },
    district: 'tw',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3665,
    lng: 114.1058,
    address: { en: 'No. 2A Yi Hong Street, Tsuen Wan, New Territories', zh: '新界荃灣仁醫街2A號' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'seaView'],
    nearestMtr: { en: 'Tsuen Wan Station', zh: '荃灣站' },
    about: {
      en: 'Harbourfront LCSD courts in Tsuen Wan with 4 hard courts and water fountain.',
      zh: '康文署荃灣海濱球場,共4個硬地球場,設有飲水機。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tsuen Wan Riviera Park tennis courts', 'tennis'),
      img('tennis courts at tsuen wan riviera park harbourfront new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c41',
    name: { en: 'Tuen Mun Swimming Pool Courts', zh: '屯門游泳池球場' },
    district: 'tm',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3985,
    lng: 113.9698,
    address: { en: 'Tuen Mun, New Territories', zh: '新界屯門' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Tuen Mun Station', zh: '屯門站' },
    about: {
      en: 'LCSD outdoor courts near Tuen Mun Swimming Pool. Good community venue for North West NT.',
      zh: '康文署屯門游泳池旁戶外球場。西北新界優質社區球場。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tuen Mun outdoor tennis courts', 'tennis'),
      img('outdoor public tennis courts near tuen mun swimming pool new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c42',
    name: { en: 'Yau Oi Sports Centre', zh: '友愛體育館' },
    district: 'tm',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3821,
    lng: 113.9695,
    address: { en: 'Yau Oi Estate, Tuen Mun, New Territories', zh: '新界屯門友愛邨' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Tuen Mun Station', zh: '屯門站' },
    about: {
      en: 'LCSD indoor sports centre in Yau Oi Estate serving the Tuen Mun community.',
      zh: '康文署友愛邨室內體育館,為屯門社區服務。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Yau Oi Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre courts at yau oi estate tuen mun new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c43',
    name: { en: 'Tin Shui Wai Sports Centre', zh: '天水圍體育館' },
    district: 'yl',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.4617,
    lng: 114.0036,
    address: { en: 'Tin Shui Wai, New Territories', zh: '新界天水圍' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Tin Shui Wai Station', zh: '天水圍站' },
    about: {
      en: 'LCSD indoor sports centre in Tin Shui Wai. Popular venue serving the growing West NT community.',
      zh: '康文署天水圍室內體育館。服務不斷發展的西鐵沿線社區。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Tin Shui Wai Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre courts at tin shui wai new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c44',
    name: { en: 'Long Ping Estate Courts', zh: '朗屏邨球場' },
    district: 'yl',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.4518,
    lng: 114.0225,
    address: { en: 'Long Ping Estate, Yuen Long, New Territories', zh: '新界元朗朗屏邨' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['water'],
    nearestMtr: { en: 'Long Ping Station', zh: '朗屏站' },
    about: {
      en: 'LCSD outdoor courts in Long Ping Estate, a short walk from the MTR.',
      zh: '康文署朗屏邨戶外球場,距離港鐵站僅數分鐘步程。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Long Ping Estate tennis courts', 'tennis'),
      img('outdoor tennis courts at long ping estate yuen long new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c45',
    name: { en: 'West Kowloon Cultural District Courts', zh: '西九文化區球場' },
    district: 'ytm',
    sport: 'both',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3004,
    lng: 114.1603,
    address: { en: 'West Kowloon Cultural District, Kowloon', zh: '九龍西九文化區' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'seaView', 'cafe'],
    nearestMtr: { en: 'Austin Station / Kowloon Station', zh: '柯士甸站 / 九龍站' },
    about: {
      en: 'Modern public courts in the West Kowloon Cultural District. Stunning harbour views and both tennis and pickleball lines.',
      zh: '西九文化區現代化公眾球場。維港景色一流,同時設有網球及匹克球線。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('West Kowloon Cultural District courts', 'both'),
      img('modern tennis and pickleball courts at west kowloon cultural district with harbour view', 'landscape_16_9')
    ]
  },
  {
    id: 'c46',
    name: { en: 'Cherry Street Park', zh: '櫻桃街公園' },
    district: 'ytm',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3201,
    lng: 114.1638,
    address: { en: 'Cherry Street, Tai Kok Tsui, Kowloon', zh: '九龍大角咀櫻桃街公園' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Olympic Station / Tai Kok Tsui Station', zh: '奧運站 / 大角咀站' },
    about: {
      en: 'LCSD courts on Cherry Street Park near the Tai Kok Tsui waterfront.',
      zh: '康文署大角咀櫻桃街公園球場,靠近海皮。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Cherry Street Park tennis courts', 'tennis'),
      img('outdoor tennis courts at cherry street park tai kok tsui kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c47',
    name: { en: 'Boundary Street Sports Centre', zh: '界限街體育館' },
    district: 'ytm',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3283,
    lng: 114.1687,
    address: { en: 'Boundary Street, Prince Edward, Kowloon', zh: '九龍太子界限街' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Prince Edward Station / Mong Kok Station', zh: '太子站 / 旺角站' },
    about: {
      en: 'LCSD indoor sports centre on Boundary Street near Mong Kok. Air-conditioned hall.',
      zh: '康文署界限街室內體育館,靠近旺角。冷氣開放。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Boundary Street Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre tennis courts at boundary street mong kok kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c48',
    name: { en: 'Pei Ho Street Sports Centre', zh: '北河街體育館' },
    district: 'ssp',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3321,
    lng: 114.1556,
    address: { en: 'Pei Ho Street, Sham Shui Po, Kowloon', zh: '九龍深水埗北河街' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Sham Shui Po Station', zh: '深水埗站' },
    about: {
      en: 'LCSD indoor courts in Sham Shui Po. Busy community venue near the market area.',
      zh: '康文署深水埗室內球場。靠近街市,繁忙的社區場地。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Pei Ho Street Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre courts at pei ho street sham shui po kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c49',
    name: { en: 'Lai Chi Kok Park Sports Centre', zh: '荔枝角公園體育館' },
    district: 'ssp',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3366,
    lng: 114.1468,
    address: { en: 'Lai Chi Kok Park, Sham Shui Po, Kowloon', zh: '九龍深水埗荔枝角公園' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 23:00', zh: '07:00 – 23:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Lai Chi Kok Station / Cheung Sha Wan Station', zh: '荔枝角站 / 長沙灣站' },
    about: {
      en: 'LCSD courts inside Lai Chi Kok Park. Large park setting with good facilities.',
      zh: '康文署荔枝角公園內球場。大型公園環境,設施齊全。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Lai Chi Kok Park Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre tennis courts at lai chi kok park sham shui po kowloon', 'landscape_16_9')
    ]
  },
  {
    id: 'c50',
    name: { en: 'Kwai Tsing Sports Ground', zh: '葵青運動場' },
    district: 'kwts',
    sport: 'tennis',
    surface: 'hard',
    environment: 'outdoor',
    lat: 22.3566,
    lng: 114.1062,
    address: { en: 'Kwai Hing Road, Kwai Chung, New Territories', zh: '新界葵涌葵興路' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water'],
    nearestMtr: { en: 'Kwai Hing Station', zh: '葵興站' },
    about: {
      en: 'LCSD outdoor courts at Kwai Tsing Sports Ground. Multi-sport venue in the Kwai Tsing industrial area.',
      zh: '康文署葵青運動場戶外球場。葵青工業區內的多用途運動場地。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Kwai Tsing Sports Ground tennis courts', 'tennis'),
      img('outdoor tennis courts at kwai tsing sports ground new territories', 'landscape_16_9')
    ]
  },
  {
    id: 'c51',
    name: { en: 'Lai King Sports Centre', zh: '荔景體育館' },
    district: 'kwts',
    sport: 'tennis',
    surface: 'hard',
    environment: 'indoor',
    lat: 22.3461,
    lng: 114.1305,
    address: { en: 'Lai King Estate, Kwai Chung, New Territories', zh: '新界葵涌荔景邨' },
    lights: true,
    free: false,
    isPublic: true,
    opening: { en: '07:00 – 22:00', zh: '07:00 – 22:00' },
    amenities: ['shower', 'locker', 'water', 'aircon'],
    nearestMtr: { en: 'Lai King Station', zh: '荔景站' },
    about: {
      en: 'LCSD indoor courts in Lai King Estate, easily accessible via MTR.',
      zh: '康文署荔景邨室內體育館,港鐵直達,交通便利。'
    },
    claimedBy: null,
    photos: [
      courtPhoto('Lai King Sports Centre indoor courts', 'tennis'),
      img('indoor LCSD sports centre tennis courts at lai king estate new territories', 'landscape_16_9')
    ]
  }
]

export const reviews = [
  { id: 'r1', courtId: 'c1', authorId: 'm4', rating: 5, date: '2026-09-10', text: { en: 'Great courts, always well maintained. Booking is competitive on weekends but weekday evenings are fine.', zh: '場地質素好,保養一流。週末預約競爭激烈,但平日晚上冇問題。' } },
  { id: 'r2', courtId: 'c1', authorId: 'm2', rating: 4, date: '2026-08-28', text: { en: 'Solid hard courts with good lighting. The queue for the shower rooms after peak hours can be long.', zh: '硬地場質素扎實,燈光充足。黃金時段後沖涼房要排隊。' } },
  { id: 'r3', courtId: 'c1', authorId: 'm1', rating: 5, date: '2026-08-02', text: { en: 'My home court. Book via Leisure Link and you are set. Sunrise sessions are the best.', zh: '我嘅主場。用康體通預約就可以。朝早打波最正。' } },
  { id: 'r4', courtId: 'c2', authorId: 'm6', rating: 5, date: '2026-09-05', text: { en: 'World-class facility. The show court is stunning and the practice courts are well kept.', zh: '世界級設施。表演場好靚,練習場保養亦好。' } },
  { id: 'r5', courtId: 'c2', authorId: 'm4', rating: 5, date: '2026-07-19', text: { en: 'Hosted a tournament here — immaculate courts and professional staff throughout.', zh: '喺度辦過比賽 — 球場一塵不染,職員全程專業。' } },
  { id: 'r6', courtId: 'c3', authorId: 'm7', rating: 5, date: '2026-09-12', text: { en: 'Best pickleball venue in HK. Rent a paddle, join a social, make friends. The cushioned floor saves your knees.', zh: '香港最好嘅匹克球場地。租拍、參加友誼賽、識新朋友。緩衝地板好護膝。' } },
  { id: 'r7', courtId: 'c3', authorId: 'm3', rating: 4, date: '2026-08-15', text: { en: 'As a beginner I felt very welcome. Great rental paddles and a very social atmosphere.', zh: '作為新手都好受歡迎。球拍租借服務好,氣氛好社交。' } },
  { id: 'r8', courtId: 'c5', authorId: 'm2', rating: 4, date: '2026-09-01', text: { en: 'Free courts are rare — treasure these. Surface is a bit worn near the baseline but perfectly playable.', zh: '免費球場好罕有 — 要珍惜。底線附近地面有少少磨損,但完全玩得。' } },
  { id: 'r9', courtId: 'c7', authorId: 'm10', rating: 5, date: '2026-08-22', text: { en: 'Clay court heaven. Sliding is possible and the club members are welcoming to visitors.', zh: '紅土場天堂。可以滑步,會員對訪客好友善。' } },
  { id: 'r10', courtId: 'c11', authorId: 'm5', rating: 5, date: '2026-09-08', text: { en: 'Free courts with a harbour view! Play pickleball in the morning then grab brunch nearby.', zh: '免費球場仲要有海景!朝早打匹克球,之後去附近食 brunch。' } },
  { id: 'r11', courtId: 'c10', authorId: 'm4', rating: 4, date: '2026-07-30', text: { en: 'Beautiful setting by the sea. Wind can be a factor in the afternoon, morning sessions are calmer.', zh: '海邊靚景。下午風比較大,上午時段較平靜。' } },
  { id: 'r12', courtId: 'c15', authorId: 'm1', rating: 5, date: '2026-09-14', text: { en: 'New courts are fantastic. Clean changing rooms, easy booking, impressive lighting for night play.', zh: '新場地超正。更衣室乾淨,預約方便,夜晚燈光一流。' } },
  { id: 'r13', courtId: 'c4', authorId: 'm1', rating: 5, date: '2026-09-09', text: { en: 'Covered courts mean we play through the typhoon season. The pickleball sessions on Sunday are great fun.', zh: '有蓋場地,颱風季都照打。星期日匹克球時段好好玩。' } },
  { id: 'r14', courtId: 'c6', authorId: 'm12', rating: 5, date: '2026-08-18', text: { en: 'Views over Happy Valley are unbeatable. Bring water — the walk up is a warm-up itself!', zh: '跑馬地景觀無得輸。記得帶水 — 行上去已經係熱身!' } },
  { id: 'r15', courtId: 'c9', authorId: 'm6', rating: 4, date: '2026-07-25', text: { en: 'Covered and reliable. Parking is a bit tight on weekends.', zh: '有蓋場地,好可靠。週末泊車位比較緊張。' } },
  { id: 'r16', courtId: 'c14', authorId: 'm8', rating: 5, date: '2026-09-11', text: { en: 'Learned pickleball here at the beginner sessions. The coaches are patient and the floor is soft.', zh: '喺度嘅初學者時段學匹克球。教練好有耐性,地板好軟。' } },
  { id: 'r17', courtId: 'c12', authorId: 'm11', rating: 4, date: '2026-08-30', text: { en: 'Aircon is a blessing in summer. Wednesday league is competitive and well run.', zh: '夏天有冷氣真係恩物。星期三聯賽水平高,辦得有條理。' } },
  { id: 'r18', courtId: 'c17', authorId: 'm9', rating: 4, date: '2026-08-05', text: { en: 'Great for the islands community. Courts can get busy after school hours.', zh: '島上社群嘅好去處。放學後時段會比較多人。' } },
  { id: 'r19', courtId: 'c18', authorId: 'm12', rating: 5, date: '2026-09-03', text: { en: 'Convenient indoor pickleball in Chai Wan. The staff set up nets on time and the hall stays cool.', zh: '柴灣方便的室內匹克球場。職員準時開網,場館夠涼。' } },
  { id: 'r20', courtId: 'c8', authorId: 'm7', rating: 3, date: '2026-06-20', text: { en: 'Decent free courts but the surface is showing its age. Fine for casual hits.', zh: '免費場地算唔錯,但地面有啲舊。休閒打波冇問題。' } },
  { id: 'r21', courtId: 'c16', authorId: 'm8', rating: 4, date: '2026-08-12', text: { en: 'Quiet and well kept. Lots of space to warm up around the ground.', zh: '清靜,保養好。運動場四周有大把空間熱身。' } },
  { id: 'r22', courtId: 'c13', authorId: 'm11', rating: 4, date: '2026-07-15', text: { en: 'Artificial grass plays nicely and is kind to your knees. Shade from trees in late afternoon.', zh: '人造草打落幾好,護膝一流。傍晚有樹蔭。' } }
]

export const groups = [
  {
    id: 'g1',
    name: { en: 'Kowloon Tennis Social', zh: '九龍網球聯誼會' },
    type: 'public',
    sports: ['tennis'],
    level: 'intermediate',
    venuePrefs: { en: 'Kowloon Tsai, King’s Park, Victoria Park', zh: '九龍仔、京士柏、維園' },
    description: { en: 'Weekly social tennis across Kowloon courts. All friendly intermediates welcome!', zh: '每週於九龍各場地舉辦友誼網球活動。歡迎所有友善的中級球員!' },
    adminId: 'm2',
    members: ['m2', 'm1', 'm5', 'm4', 'm12'],
    activities: [
      { id: 'a1', title: { en: 'Kowloon Tsai Saturday Morning Hit', zh: '九龍仔週六早晨對打' }, date: '2026-09-21', time: '09:00', venue: { en: 'Kowloon Tsai Sports Ground Court 3', zh: '九龍仔運動場 3 號場' }, max: 8, joined: ['m2', 'm1', 'm5'] },
      { id: 'a2', title: { en: 'King’s Park Clay Clinic', zh: '京士柏紅土練習' }, date: '2026-09-27', time: '17:30', venue: { en: 'King’s Park Tennis Courts Court 1', zh: '京士柏網球場 1 號場' }, max: 4, joined: ['m2', 'm4'] }
    ]
  },
  {
    id: 'g2',
    name: { en: 'HK Pickleball Addicts', zh: '香港匹克球發燒友' },
    type: 'public',
    sports: ['pickleball'],
    level: 'beginner',
    venuePrefs: { en: 'KITEC, Chai Wan, Tai Po', zh: '九展、柴灣、大埔' },
    description: { en: 'The friendliest pickleball group in Hong Kong. Learn the game, join socials, find your doubles partner.', zh: '香港最友善的匹克球群組。學打波、參加聯誼活動、搵你嘅雙打拍檔。' },
    adminId: 'm7',
    members: ['m7', 'm3', 'm8', 'm1', 'm10'],
    activities: [
      { id: 'a3', title: { en: 'Monday Night Social @ KITEC', zh: '星期一晚友誼賽 @九展' }, date: '2026-09-22', time: '20:00', venue: { en: 'KITEC Pickleball Arena', zh: '九展匹克球館' }, max: 12, joined: ['m7', 'm3', 'm1'] },
      { id: 'a4', title: { en: 'Beginner Bootcamp — Chai Wan', zh: '初學者訓練班 — 柴灣' }, date: '2026-09-26', time: '10:00', venue: { en: 'Chai Wan Sports Centre', zh: '柴灣體育館' }, max: 8, joined: ['m7', 'm8'] }
    ]
  },
  {
    id: 'g3',
    name: { en: 'Island Tennis Collective', zh: '港島網球會' },
    type: 'invite',
    sports: ['tennis'],
    level: 'advanced',
    venuePrefs: { en: 'HK Tennis Centre, SCAA, Bowen Road', zh: '香港網球中心、南華會、寶雲道' },
    description: { en: 'Invite-only group for advanced players on Hong Kong Island. Competitive ladder matches every month.', zh: '港島高級球員的邀請制群組。每月舉辦競技排名賽。' },
    adminId: 'm4',
    members: ['m4', 'm2', 'm6'],
    activities: [
      { id: 'a5', title: { en: 'Monthly Ladder Finals', zh: '每月排名賽決賽' }, date: '2026-09-28', time: '14:00', venue: { en: 'HK Tennis Centre Court 1', zh: '香港網球中心 1 號場' }, max: 4, joined: ['m4', 'm2', 'm6'] }
    ]
  },
  {
    id: 'g4',
    name: { en: 'New Territories Weekend Warriors', zh: '新界週末戰士' },
    type: 'public',
    sports: ['tennis', 'pickleball'],
    level: 'intermediate',
    venuePrefs: { en: 'Tsuen Wan West, Tuen Mun, Sha Tin', zh: '荃灣西、屯門、沙田' },
    description: { en: 'Weekend sessions across the New Territories — tennis in the morning, pickleball after lunch!', zh: '週末於新界各地舉辦活動 — 早上打網球,午餐後打匹克球!' },
    adminId: 'm5',
    members: ['m5', 'm11', 'm1', 'm8'],
    activities: [
      { id: 'a6', title: { en: 'Tsuen Wan West Sunday Mix', zh: '荃灣西週日混合賽' }, date: '2026-09-20', time: '10:00', venue: { en: 'Tsuen Wan West Park', zh: '荃灣西公園' }, max: 8, joined: ['m5', 'm11', 'm1'] }
    ]
  }
]

export const listings = [
  {
    id: 'l1',
    title: { en: 'Babolat Pure Drive 2023 (4 3/8)', zh: 'Babolat Pure Drive 2023 (4 3/8)' },
    price: 850,
    category: 'rackets',
    condition: 'likeNew',
    status: 'available',
    sellerId: 'm1',
    district: 'kc',
    listedOn: '2026-09-12',
    description: { en: 'Used for one season. New strings, replaced grip, 2 dampeners included. Selling because I switched to a Pro Staff.', zh: '用咗一個賽季。新線、已換握把,附送 2 個避震器。因為轉用 Pro Staff 所以出售。' },
    photo: listingPhoto('a Babolat Pure Drive tennis racket with fresh strings')
  },
  {
    id: 'l2',
    title: { en: 'Head Speed MP 2022 (4 1/4)', zh: 'Head Speed MP 2022 (4 1/4)' },
    price: 720,
    category: 'rackets',
    condition: 'lightlyUsed',
    status: 'available',
    sellerId: 'm2',
    district: 'st',
    listedOn: '2026-09-10',
    description: { en: 'Solid all-rounder racket. Some paint chips at the top of the frame, plays perfectly. Grip size 4 1/4.', zh: '全能型球拍。拍框頂部有少許掉漆,但狀態極佳。握把 4 1/4。' },
    photo: listingPhoto('a Head Speed MP tennis racket on a court')
  },
  {
    id: 'l3',
    title: { en: 'Selkirk Amped S2 Pickleball Paddle', zh: 'Selkirk Amped S2 匹克球拍' },
    price: 480,
    category: 'rackets',
    condition: 'likeNew',
    status: 'available',
    sellerId: 'm3',
    district: 'ytm',
    listedOn: '2026-09-08',
    description: { en: 'Upgraded after two months. Great control paddle for beginners. Comes with edge guard tape and paddle cover.', zh: '用咗兩個月升級換拍。控制型球拍,好啱新手。附送護邊貼及拍套。' },
    photo: listingPhoto('a Selkirk pickleball paddle with edge guard tape')
  },
  {
    id: 'l4',
    title: { en: 'Asics Gel-Resolution 9 (UK 9)', zh: 'Asics Gel-Resolution 9 (UK 9)' },
    price: 560,
    category: 'shoes',
    condition: 'lightlyUsed',
    status: 'available',
    sellerId: 'm4',
    district: 'wc',
    listedOn: '2026-09-05',
    description: { en: 'Comfortable court shoes, great for hard courts. Only mild wear on the outsole. UK size 9.', zh: '舒適嘅網球鞋,適合硬地場。鞋底只有輕微磨損。英國碼 9。' },
    photo: listingPhoto('a pair of Asics Gel-Resolution tennis shoes')
  },
  {
    id: 'l5',
    title: { en: 'Wilson Clash 100 v2 (4 3/8)', zh: 'Wilson Clash 100 v2 (4 3/8)' },
    price: 780,
    category: 'rackets',
    condition: 'new',
    status: 'sold',
    sellerId: 'm6',
    district: 'so',
    listedOn: '2026-08-28',
    description: { en: 'Bought by mistake (wrong grip size). Never strung, plastic still on the grip. Selling at below retail.', zh: '買錯咗(握把唔啱)。從未穿線,握把膠膜都未拆。低於零售價出售。' },
    photo: listingPhoto('a brand new Wilson Clash tennis racket in plastic wrap')
  },
  {
    id: 'l6',
    title: { en: 'Pickleball Starter Set (2 Paddles + 6 Balls)', zh: '匹克球新手套裝(2 拍 + 6 球)' },
    price: 320,
    category: 'courtEquip',
    condition: 'lightlyUsed',
    status: 'available',
    sellerId: 'm7',
    district: 'kt',
    listedOn: '2026-09-09',
    description: { en: 'Perfect way to start! Two wooden beginner paddles and six outdoor balls in a carry bag.', zh: '開始玩匹克球嘅最佳方式!兩塊木製新手拍、六個室外球連手挽袋。' },
    photo: listingPhoto('a pickleball starter set with two paddles and balls')
  },
  {
    id: 'l7',
    title: { en: 'Lululemon Tennis Skirt (M, Navy)', zh: 'Lululemon 網球裙(M 碼,深藍)' },
    price: 180,
    category: 'apparel',
    condition: 'likeNew',
    status: 'available',
    sellerId: 'm12',
    district: 'ea',
    listedOn: '2026-09-06',
    description: { en: 'Worn once, too small for me. Navy colour, medium size, with inner shorts and ball pocket.', zh: '只著過一次,唔啱身。深藍色,M 碼,附內裡短褲同波袋。' },
    photo: listingPhoto('a navy blue tennis skirt folded neatly')
  },
  {
    id: 'l8',
    title: { en: 'Babolat Tennis Bag 12-Racket (Black)', zh: 'Babolat 12 支裝網球袋(黑色)' },
    price: 420,
    category: 'bags',
    condition: 'heavilyUsed',
    status: 'available',
    sellerId: 'm9',
    district: 'is',
    listedOn: '2026-09-01',
    description: { en: 'Faithful bag that has travelled everywhere. Zips all work, some scuffs on the bottom. Holds 12 rackets.', zh: '陪我走過好多地方嘅袋。拉鏈全部正常,底部有少許刮痕。可裝 12 支拍。' },
    photo: listingPhoto('a black tennis racket bag with Babolat logo')
  },
  {
    id: 'l9',
    title: { en: 'Luxilon 4G String (2 sets, 16L)', zh: 'Luxilon 4G 網線(2 套,16L)' },
    price: 260,
    category: 'strings',
    condition: 'new',
    status: 'available',
    sellerId: 'm11',
    district: 'tm',
    listedOn: '2026-09-13',
    description: { en: 'Two unopened sets of Luxilon 4G 16L. My stringer switched me to a different set-up, no longer needed.', zh: '兩套未拆封嘅 Luxilon 4G 16L。因為我轉咗穿線配方,所以唔再需要。' },
    photo: listingPhoto('two rolls of Luxilon tennis string in packaging')
  },
  {
    id: 'l10',
    title: { en: 'Grip Tape Bundle (Tourna Grip x10)', zh: '握把膠套裝(Tourna Grip x10)' },
    price: 120,
    category: 'accessories',
    condition: 'new',
    status: 'sold',
    sellerId: 'm1',
    district: 'kc',
    listedOn: '2026-08-20',
    description: { en: 'Ten rolls of Tourna Grip, the classic absorbent overgrip. All sealed in packaging.', zh: '十卷 Tourna Grip 經典吸汗握把膠。全部原裝未拆。' },
    photo: listingPhoto('ten rolls of Tourna Grip overgrip tape')
  }
]

export const connections = [
  { id: 'cn1', userA: 'm1', userB: 'm2', since: '2026-07-14' },
  { id: 'cn2', userA: 'm1', userB: 'm3', since: '2026-08-02' },
  { id: 'cn3', userA: 'm1', userB: 'm5', since: '2026-08-19' },
  { id: 'cn4', userA: 'm1', userB: 'm7', since: '2026-09-01' },
  { id: 'cn5', userA: 'm2', userB: 'm6', since: '2026-07-20' },
  { id: 'cn6', userA: 'm3', userB: 'm8', since: '2026-08-25' },
  { id: 'cn7', userA: 'm4', userB: 'm5', since: '2026-07-08' },
  { id: 'cn8', userA: 'm1', userB: 'm4', since: '2026-09-05' }
]

export const connectRequests = [
  { id: 'cr1', from: 'm8', to: 'm1', status: 'pending', sentAt: '2026-09-15' },
  { id: 'cr2', from: 'm11', to: 'm1', status: 'pending', sentAt: '2026-09-16' },
  { id: 'cr3', from: 'm1', to: 'm6', status: 'pending', sentAt: '2026-09-14' }
]

export const messages = [
  {
    id: 'con1',
    participants: ['m1', 'm2'],
    messages: [
      { from: 'm2', text: { en: 'Hi Ken! Great hitting session at Kowloon Tsai today. Rematch next Saturday?', zh: 'Ken 你好!今日九龍仔打得好開心。下星期六再戰?' }, at: '2026-09-13T10:24:00' },
      { from: 'm1', text: { en: 'Absolutely! Same time, 9am? I will book court 2.', zh: '當然可以!同一時間,9 點?我會預約 2 號場。' }, at: '2026-09-13T10:31:00' },
      { from: 'm2', text: { en: 'Perfect. See you then! 🎾', zh: '完美。到時見!🎾' }, at: '2026-09-13T10:33:00' }
    ]
  },
  {
    id: 'con2',
    participants: ['m1', 'm3'],
    messages: [
      { from: 'm1', text: { en: 'Hey David, want to join the Monday social at KITEC this week?', zh: 'David,今個星期一想唔想一齊去九展嘅友誼賽?' }, at: '2026-09-15T18:02:00' },
      { from: 'm3', text: { en: 'Count me in! First time at a social, any tips?', zh: '一定嚟!第一次參加友誼賽,有冇貼士?' }, at: '2026-09-15T18:20:00' }
    ]
  },
  {
    id: 'con3',
    participants: ['m1', 'm5'],
    messages: [
      { from: 'm5', text: { en: 'Is the Tsuen Wan West session still on Sunday? The forecast looks clear.', zh: '星期日荃灣西嘅活動照常嗎?天氣預報話天晴。' }, at: '2026-09-16T09:11:00' }
    ]
  }
]
