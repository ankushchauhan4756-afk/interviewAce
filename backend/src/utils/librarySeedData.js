import { SAMPLE_QUESTIONS, extractKeyPoints } from '../../seedLibraryFinal.js';

export { extractKeyPoints };
export const LIBRARY_SEED_DATA = SAMPLE_QUESTIONS;

export const getExpectedLibraryQuestionCount = (course) => {
  const topics = LIBRARY_SEED_DATA[course];
  if (!topics) return 0;
  return Object.values(topics).reduce((total, questions) => total + questions.length, 0);
};

export const createLibrarySeedDocuments = (coursesToSeed = []) => {
  const documents = [];
  const targetCourses = coursesToSeed.length > 0 ? new Set(coursesToSeed) : null;

  for (const [course, topics] of Object.entries(LIBRARY_SEED_DATA)) {
    if (targetCourses && !targetCourses.has(course)) continue;

    for (const [topic, questions] of Object.entries(topics)) {
      questions.forEach((item, index) => {
        const difficulties = ['Easy', 'Medium', 'Hard'];
        const difficulty = difficulties[index % difficulties.length];
        documents.push({
          course,
          topic,
          question: item.q,
          answer: item.a,
          difficulty,
          tags: [topic, course, difficulty.toLowerCase()],
          isImportant: Math.random() < 0.25,
          views: 0,
          keyPoints: extractKeyPoints(item.a)
        });
      });
    }
  }

  return documents;
};
