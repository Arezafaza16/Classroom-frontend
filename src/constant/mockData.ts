import { Subject } from "../types";

export const mockSubjects: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        description:
            "A foundational course covering core computing concepts including algorithms, data structures, and programming fundamentals using Python.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Linear Algebra",
        department: "Mathematics",
        description:
            "An intermediate course exploring vector spaces, matrix operations, eigenvalues, and their applications in science and engineering is very good.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "ENG110",
        name: "Academic Writing and Composition",
        department: "English",
        description:
            "A course focused on developing critical reading and analytical writing skills for academic and professional contexts.",
        createdAt: new Date().toISOString(),
    },
];
