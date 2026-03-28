# Sample Questions Data

You can use this data to populate your MongoDB database with sample coding questions.

```javascript
const sampleQuestions = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    topic: "Arrays",
    constraints: "2 ≤ nums.length ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9, -10^9 ≤ target ≤ 10^9",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9, so we return [0, 1]"
      }
    ],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    solutionExplanation: "Use a hash map to store numbers and their indices. For each number, check if its complement exists in the map.",
    timeComplexity: {
      optimal: "O(n)",
      bruteForce: "O(n²)"
    },
    spaceComplexity: {
      optimal: "O(n)",
      bruteForce: "O(1)"
    },
    tags: ["Array", "Hash Table", "Two Pointers"],
    attemptCount: 0,
    avgAccuracy: 0
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward.",
    difficulty: "Easy",
    topic: "Strings",
    constraints: "-2^31 ≤ x ≤ 2^31 - 1",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads the same as 121 backward"
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "-121 is -121 backward, but we check 121, not -121"
      }
    ],
    solution: `function isPalindrome(x) {
  if (x < 0) return false;
  let original = x;
  let reversed = 0;
  while (x > 0) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return original === reversed;
}`,
    solutionExplanation: "Reverse the integer and compare it with the original.",
    timeComplexity: {
      optimal: "O(log n)",
      bruteForce: "O(n)"
    },
    spaceComplexity: {
      optimal: "O(1)",
      bruteForce: "O(n)"
    },
    tags: ["Math", "Integer"],
    attemptCount: 0,
    avgAccuracy: 0
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    difficulty: "Easy",
    topic: "Linked Lists",
    constraints: "The number of nodes in both lists is in the range [0, 50]",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merge both lists in a sorted manner"
      }
    ],
    solution: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
}`,
    solutionExplanation: "Use two pointers to traverse both lists and merge them in sorted order.",
    timeComplexity: {
      optimal: "O(n + m)",
      bruteForce: "O((n+m) log(n+m))"
    },
    spaceComplexity: {
      optimal: "O(1)",
      bruteForce: "O(n+m)"
    },
    tags: ["Linked List", "Recursion"],
    attemptCount: 0,
    avgAccuracy: 0
  },
  {
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    difficulty: "Medium",
    topic: "Trees",
    constraints: "The number of nodes in the tree is in the range [0, 2000]",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level-by-level traversal"
      }
    ],
    solution: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    solutionExplanation: "Use BFS with a queue to traverse the tree level by level.",
    timeComplexity: {
      optimal: "O(n)",
      bruteForce: "O(n)"
    },
    spaceComplexity: {
      optimal: "O(w)",
      bruteForce: "O(n)"
    },
    tags: ["Tree", "BFS", "Queue"],
    attemptCount: 0,
    avgAccuracy: 0
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    topic: "Strings",
    constraints: "0 ≤ s.length ≤ 5 × 10^4",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: '"abc" is the longest substring'
      }
    ],
    solution: `function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
    solutionExplanation: "Use sliding window with a set to track unique characters.",
    timeComplexity: {
      optimal: "O(n)",
      bruteForce: "O(n²)"
    },
    spaceComplexity: {
      optimal: "O(min(n, m))",
      bruteForce: "O(1)"
    },
    tags: ["String", "Sliding Window", "Hash Table"],
    attemptCount: 0,
    avgAccuracy: 0
  }
];
```

## How to Use

1. Create a seed file in backend directory:
```bash
touch backend/seed.js
```

2. Add this code to seed.js:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const sampleQuestions = [ /* paste data above */ ];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
```

3. Run the seed script:
```bash
node seed.js
```

## Add More Questions

Edit backend/seed.js and add more questions to the array following the same format.

## Export Data

To get questions from production database:
```bash
mongoexport --uri="mongodb_connection_string" \
  --collection questions \
  --out questions.json
```
