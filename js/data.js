const initialPatients = [
  {
    id: "PT-1001",
    name: "Tan Wei Ling",
    avatarColor: "#0052CC",
    avatarBg: "#E8F0FE",
    phone: "+65 9123 4567",
    country: "Singapore",
    flag: "🇸🇬",
    datetime: "14 Oct 2026 10:30 AM",
    isVip: true,
    email: "weiling.tan@example.com",
    birthday: "15 Jun 1989",
    age: 37,
    nric: "S8934120A",
    occupation: "Product Manager",
    lastVisit: "02 Sep 2026 (40 mins)",
    remarks: "Penicillin allergy. Mild asthma.",
    appointments: [
      {
        date: "24 Oct 2026 02:30 PM",
        treatment: "Routine Checkup",
        doctor: "Dr. Sarah Lin",
        symptoms: "Annual corporate physical checkup"
      }
    ]
  },
  {
    id: "PT-1002",
    name: "Mohd Farhan",
    avatarColor: "#0D6EFD",
    avatarBg: "#CFE2FF",
    phone: "+65 8234 5678",
    country: "Singapore",
    flag: "🇸🇬",
    datetime: "14 Oct 2026 11:15 AM",
    isVip: false,
    email: "farhan.yusof@example.com",
    birthday: "08 Aug 1992",
    age: 34,
    nric: "S9210452C",
    occupation: "Operations Lead",
    lastVisit: "18 Aug 2026 (25 mins)",
    remarks: "No known drug allergies (NKDA).",
    appointments: [
      {
        date: "28 Oct 2026 04:00 PM",
        treatment: "Physiotherapy",
        doctor: "Dr. Ryan Matthew",
        symptoms: "Lower back strain follow-up"
      }
    ]
  },
  {
    id: "PT-1003",
    name: "Li Ming Xuan",
    avatarColor: "#198754",
    avatarBg: "#D1E7DD",
    phone: "+86 138 0013 8000",
    country: "China",
    flag: "🇨🇳",
    datetime: "13 Oct 2026 03:45 PM",
    isVip: true,
    email: "mingxuan.li@example.cn",
    birthday: "23 Nov 1981",
    age: 44,
    nric: "G4829103K",
    occupation: "Business Director",
    lastVisit: "10 Jul 2026 (50 mins)",
    remarks: "Sulfa drug allergy. Elevated fasting glucose.",
    appointments: [
      {
        date: "20 Oct 2026 09:00 AM",
        treatment: "Endocrinology",
        doctor: "Dr. Angela Goh",
        symptoms: "HbA1c blood test review"
      }
    ]
  },
  {
    id: "PT-1004",
    name: "Sarah Jenkins",
    avatarColor: "#6F42C1",
    avatarBg: "#E2D9F3",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    flag: "🇬🇧",
    datetime: "13 Oct 2026 09:20 AM",
    isVip: false,
    email: "sarah.jenkins@example.uk",
    birthday: "19 Feb 1995",
    age: 31,
    nric: "E7391042B",
    occupation: "Architect",
    lastVisit: "22 May 2026 (30 mins)",
    remarks: "Latex sensitivity. Migraine history.",
    appointments: [
      {
        date: "05 Nov 2026 03:15 PM",
        treatment: "Eye Checkup",
        doctor: "Dr. Kenneth Chia",
        symptoms: "Visual acuity and dry eyes check"
      }
    ]
  },
  {
    id: "PT-1005",
    name: "Kenji Sato",
    avatarColor: "#D63384",
    avatarBg: "#F8D7DA",
    phone: "+81 90 1234 5678",
    country: "Japan",
    flag: "🇯🇵",
    datetime: "12 Oct 2026 04:10 PM",
    isVip: true,
    email: "kenji.sato@example.jp",
    birthday: "12 Mar 1978",
    age: 48,
    nric: "P9182341M",
    occupation: "Creative Director",
    lastVisit: "15 Sep 2026 (45 mins)",
    remarks: "Hypertension (Stage 1). Takes Amlodipine.",
    appointments: [
      {
        date: "25 Oct 2026 10:30 AM",
        treatment: "Cardiology Review",
        doctor: "Dr. Sarah Lin",
        symptoms: "Resting ECG and blood pressure review"
      }
    ]
  },
  {
    id: "PT-1006",
    name: "Nurul Aisyah",
    avatarColor: "#0DCAF0",
    avatarBg: "#CFF4FC",
    phone: "+60 12-345 6789",
    country: "Malaysia",
    flag: "🇲🇾",
    datetime: "12 Oct 2026 01:50 PM",
    isVip: false,
    email: "nurul.aisyah@example.my",
    birthday: "04 Oct 1996",
    age: 30,
    nric: "S9654129F",
    occupation: "Chemical Engineer",
    lastVisit: "01 Sep 2026 (20 mins)",
    remarks: "Aspirin & NSAID allergy.",
    appointments: [
      {
        date: "02 Nov 2026 01:45 PM",
        treatment: "Dermatology",
        doctor: "Dr. Evelyn Wong",
        symptoms: "Skin allergy test"
      }
    ]
  },
  {
    id: "PT-1007",
    name: "David Miller",
    avatarColor: "#FD7E14",
    avatarBg: "#FFE5D0",
    phone: "+1 (415) 555-0192",
    country: "United States",
    flag: "🇺🇸",
    datetime: "11 Oct 2026 11:40 AM",
    isVip: true,
    email: "david.miller@example.com",
    birthday: "30 Jan 1983",
    age: 43,
    nric: "U8492019X",
    occupation: "Consultant",
    lastVisit: "14 Aug 2026 (60 mins)",
    remarks: "Severe peanut allergy (carries EpiPen).",
    appointments: [
      {
        date: "29 Oct 2026 03:00 PM",
        treatment: "Annual Health Screening",
        doctor: "Dr. Sarah Lin",
        symptoms: "General health screening review"
      }
    ]
  },
  {
    id: "PT-1008",
    name: "Priya Sharma",
    avatarColor: "#20C997",
    avatarBg: "#D2F4EA",
    phone: "+65 9876 5432",
    country: "Singapore",
    flag: "🇸🇬",
    datetime: "11 Oct 2026 09:15 AM",
    isVip: false,
    email: "priya.sharma@example.sg",
    birthday: "17 Sep 1990",
    age: 36,
    nric: "S9048123G",
    occupation: "Accountant",
    lastVisit: "29 Jun 2026 (30 mins)",
    remarks: "Mild iron deficiency.",
    appointments: [
      {
        date: "18 Nov 2026 10:00 AM",
        treatment: "Blood Test",
        doctor: "Dr. Angela Goh",
        symptoms: "Routine blood test review"
      }
    ]
  }
];
