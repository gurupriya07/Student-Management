
const defaultStudents = [
  {
    id: 1,
    name: "Priya",
    department: "AI & DS",
    year: "3rd Year",
    email: "priya@gmail.com",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Rahul",
    department: "CSE",
    year: "2nd Year",
    email: "rahul@gmail.com",
    phone: "9876543211"
  },
  {
    id: 3,
    name: "Divya",
    department: "IT",
    year: "3rd Year",
    email: "divya@gmail.com",
    phone: "9876543212"
  },
  {
    id: 4,
    name: "Arun",
    department: "ECE",
    year: "1st Year",
    email: "arun@gmail.com",
    phone: "9876543213"
  },
  {
    id: 5,
    name: "Kavin",
    department: "AI & DS",
    year: "2nd Year",
    email: "kavin@gmail.com",
    phone: "9876543214"
  }
];

export function getStudents() {
  try {
    const saved = localStorage.getItem("students");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Student data error:", error);
  }

  localStorage.setItem("students", JSON.stringify(defaultStudents));
  return defaultStudents;
}

export function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}
