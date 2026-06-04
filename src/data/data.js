export const pharmacies = [
  {
    id: "healthplus-ilorin",
    name: "HealthPlus Pharmacy Ilorin",
    address: "12 Ibrahim Taiwo Road, Kwara State",
    lat: 8.4821,
    lng: 4.5414
  },
  {
    id: "medplus-lagos-island",
    name: "MedPlus Lagos Island",
    address: "47 Broad Street, Lagos State",
    lat: 6.4528,
    lng: 3.3905
  },
  {
    id: "rema-ikoyi",
    name: "Rema Pharmacy Ikoyi",
    address: "3A Awolowo Road, Lagos State",
    lat: 6.4471,
    lng: 3.4244
  },
  {
    id: "alpha-surulere",
    name: "Alpha Pharmacy Surulere",
    address: "21 Bode Thomas Street, Lagos State",
    lat: 6.4947,
    lng: 3.3512
  },
  {
    id: "bethesda-vi",
    name: "Bethesda Pharmacy VI",
    address: "10 Adeola Odeku Street, Lagos State",
    lat: 6.4281,
    lng: 3.4219
  },
  {
    id: "pharmacare-ikeja",
    name: "PharmaCare Ikeja",
    address: "6 Obafemi Awolowo Way, Lagos State",
    lat: 6.5967,
    lng: 3.3411
  }
];

export const drugs = [
  // treats bacterial infections
  {
    id: "augmentin-625mg",
    brandedName: "Augmentin 625mg",
    activeIngredient: "Amoxicillin + Clavulanic Acid",
    category: "Antibiotic",
    treats: ["Urinary tract infections", "Respiratory infections", "Skin infections", "Bacterial infections"],
    brandedPrice: 9800,
    nafdacNumber: "A4-0871",
    constituents: [
      { name: "Amoxicillin", amount: 500, unit: "mg", role: "active" },
      { name: "Clavulanic Acid", amount: 125, unit: "mg", role: "active" }
    ],
    genericAlternatives: [
      {
        id: "co-amoxiclav-emzor",
        name: "Co-Amoxiclav",
        manufacturer: "Emzor Pharmaceuticals Nigeria Ltd",
        nafdacNumber: "A4-4455",
        price: 2800,
        savings: 7000,
        savingsPercent: 71,
        constituents: [
          { name: "Amoxicillin", amount: 500, unit: "mg", role: "active" },
          { name: "Clavulanic Acid", amount: 125, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["healthplus-ilorin", "medplus-lagos-island", "rema-ikoyi"]
      },
      {
        id: "amoxyclav-fidson",
        name: "Amoxyclav",
        manufacturer: "Fidson Healthcare PLC",
        nafdacNumber: "A4-3211",
        price: 3100,
        savings: 6700,
        savingsPercent: 68,
        constituents: [
          { name: "Amoxicillin", amount: 500, unit: "mg", role: "active" },
          { name: "Clavulanic Acid", amount: 125, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["alpha-surulere", "bethesda-vi", "pharmacare-ikeja"]
      }
    ]
  },
  // treats malaria
  {
    id: "coartem",
    brandedName: "Coartem",
    activeIngredient: "Artemether + Lumefantrine",
    category: "Antimalarial",
    treats: ["Malaria", "Plasmodium falciparum infection"],
    brandedPrice: 8500,
    nafdacNumber: "A4-2859",
    constituents: [
      { name: "Artemether", amount: 20, unit: "mg", role: "active" },
      { name: "Lumefantrine", amount: 120, unit: "mg", role: "active" }
    ],
    genericAlternatives: [
      {
        id: "lumartem-mecure",
        name: "Lumartem",
        manufacturer: "Mecure Industries Ltd",
        nafdacNumber: "A4-2039",
        price: 3200,
        savings: 5300,
        savingsPercent: 62,
        constituents: [
          { name: "Artemether", amount: 20, unit: "mg", role: "active" },
          { name: "Lumefantrine", amount: 120, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["healthplus-ilorin", "medplus-lagos-island", "rema-ikoyi"]
      },
      {
        id: "lonart-bliss",
        name: "Lonart",
        manufacturer: "Bliss GVS Pharma Ltd",
        nafdacNumber: "A4-7128",
        price: 3800,
        savings: 4700,
        savingsPercent: 55,
        constituents: [
          { name: "Artemether", amount: 20, unit: "mg", role: "active" },
          { name: "Lumefantrine", amount: 120, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["alpha-surulere", "bethesda-vi", "pharmacare-ikeja"]
      }
    ]
  },
  // treats protozoal and bacterial infections (diarrhoea/amoebiasis)
  {
    id: "flagyl-400mg",
    brandedName: "Flagyl 400mg",
    activeIngredient: "Metronidazole",
    category: "Antiprotozoal",
    treats: ["Amebiasis", "Giardiasis", "Trichomoniasis", "Bacterial infections"],
    brandedPrice: 1800,
    nafdacNumber: "A4-0123",
    constituents: [
      { name: "Metronidazole", amount: 400, unit: "mg", role: "active" }
    ],
    genericAlternatives: [
      {
        id: "metronidazole-bp-emzor",
        name: "Metronidazole BP",
        manufacturer: "Emzor Pharmaceuticals Nigeria Ltd",
        nafdacNumber: "04-9876",
        price: 350,
        savings: 1450,
        savingsPercent: 81,
        constituents: [
          { name: "Metronidazole", amount: 400, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["healthplus-ilorin", "medplus-lagos-island", "rema-ikoyi"]
      },
      {
        id: "metro-400-fidson",
        name: "Metro 400",
        manufacturer: "Fidson Healthcare PLC",
        nafdacNumber: "04-5432",
        price: 420,
        savings: 1380,
        savingsPercent: 77,
        constituents: [
          { name: "Metronidazole", amount: 400, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["alpha-surulere", "bethesda-vi", "pharmacare-ikeja"]
      }
    ]
  },
  // treats high blood pressure (hypertension)
  {
    id: "norvasc-5mg",
    brandedName: "Norvasc 5mg",
    activeIngredient: "Amlodipine",
    category: "Antihypertensive",
    treats: ["Hypertension", "Angina", "Coronary artery disease"],
    brandedPrice: 12000,
    nafdacNumber: "A4-1120",
    constituents: [
      { name: "Amlodipine", amount: 5, unit: "mg", role: "active" }
    ],
    genericAlternatives: [
      {
        id: "amlodipine-bp-emzor",
        name: "Amlodipine BP",
        manufacturer: "Emzor Pharmaceuticals Nigeria Ltd",
        nafdacNumber: "04-2211",
        price: 2700,
        savings: 9300,
        savingsPercent: 78,
        constituents: [
          { name: "Amlodipine", amount: 5, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["healthplus-ilorin", "medplus-lagos-island", "rema-ikoyi"]
      },
      {
        id: "amlovas-5mg-ranbaxy",
        name: "Amlovas 5mg",
        manufacturer: "Ranbaxy Laboratories Ltd",
        nafdacNumber: "04-7766",
        price: 3100,
        savings: 8900,
        savingsPercent: 74,
        constituents: [
          { name: "Amlodipine", amount: 5, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["alpha-surulere", "bethesda-vi", "pharmacare-ikeja"]
      }
    ]
  },
  // treats type 2 diabetes
  {
    id: "glucophage-500mg",
    brandedName: "Glucophage 500mg",
    activeIngredient: "Metformin Hydrochloride",
    category: "Antidiabetic",
    treats: ["Type 2 diabetes mellitus", "Insulin resistance"],
    brandedPrice: 6500,
    nafdacNumber: "A4-3091",
    constituents: [
      { name: "Metformin Hydrochloride", amount: 500, unit: "mg", role: "active" }
    ],
    genericAlternatives: [
      {
        id: "metformin-hcl-fidson",
        name: "Metformin HCl",
        manufacturer: "Fidson Healthcare PLC",
        nafdacNumber: "04-1188",
        price: 1500,
        savings: 5000,
        savingsPercent: 77,
        constituents: [
          { name: "Metformin Hydrochloride", amount: 500, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["healthplus-ilorin", "medplus-lagos-island", "rema-ikoyi"]
      },
      {
        id: "glucomet-500mg-emzor",
        name: "Glucomet 500mg",
        manufacturer: "Emzor Pharmaceuticals Nigeria Ltd",
        nafdacNumber: "04-9900",
        price: 1800,
        savings: 4700,
        savingsPercent: 72,
        constituents: [
          { name: "Metformin Hydrochloride", amount: 500, unit: "mg", role: "active" }
        ],
        pharmacyIds: ["alpha-surulere", "bethesda-vi", "pharmacare-ikeja"]
      }
    ]
  }
];
