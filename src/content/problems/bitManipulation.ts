import { Problem } from "@/types/content";

export const bitManipulationProblems: Problem[] = [
  {
    id: "single-number",
    slug: "single-number",
    title: "Single Number",
    topic: "Bit Manipulation",
    topicSlug: "bit-manipulation",
    subtopic: "XOR Invariant",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    understandTheProblem:
      "Every integer in the array has an identical twin, except for one lone integer. Identify that single integer without using a hash set or extra memory.",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once.",
    ],
    examples: [
      {
        input: "nums = [2, 2, 1]",
        output: "1",
        explanation: "2 appears twice; 1 appears once.",
      },
      {
        input: "nums = [4, 1, 2, 1, 2]",
        output: "4",
        explanation: "1 and 2 appear twice; 4 appears once.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "1 is the only element.",
      },
    ],
    hints: [
      "What happens when you XOR a number with itself? `x ^ x = 0`.",
      "What happens when you XOR a number with zero? `0 ^ x = x`.",
      "Because XOR is commutative and associative, the order of elements does not matter! All paired numbers cancel each other out.",
    ],
    bruteForce: {
      title: "Approach 1 — Hash Set Storage",
      intuition:
        "Iterate through nums. If number is in set, remove it; if not, add it. The only number remaining in the set at the end is the single number.",
      code: {
        java: `public int singleNumber(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) {
        if (!set.add(n)) {
            set.remove(n); // Duplicate found, evict!
        }
    }
    return set.iterator().next();
}`,
        cpp: `int singleNumber(vector<int>& nums) {
    unordered_set<int> s;
    for (int n : nums) {
        if (s.count(n)) s.erase(n);
        else s.insert(n);
    }
    return *s.begin();
}`,
        python: `def singleNumber(nums: list[int]) -> int:
    s = set()
    for n in nums:
        if n in s:
            s.remove(n)
        else:
            s.add(n)
    return s.pop()`,
        javascript: `var singleNumber = function(nums) {
    const s = new Set();
    for (const n of nums) {
        if (s.has(n)) s.delete(n);
        else s.add(n);
    }
    return s.values().next().value;
};`,
      },
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      explanation:
        "While linear time, the HashSet violates the problem constraint of O(1) constant extra space.",
    },
    optimalSolution: {
      title: "Approach 2 — Bitwise XOR Accumulation",
      intuition:
        "XOR properties: (1) `x ^ x = 0`; (2) `0 ^ x = x`; (3) `a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b`. XORing all numbers together cancels every paired number to 0, leaving only the unique number in strictly O(N) time and O(1) space.",
      code: {
        java: `public int singleNumber(int[] nums) {
    int xor = 0;
    for (int num : nums) {
        xor ^= num; // Duplicate values cancel to 0
    }
    return xor;
}`,
        cpp: `int singleNumber(vector<int>& nums) {
    int xorSum = 0;
    for (int num : nums) {
        xorSum ^= num;
    }
    return xorSum;
}`,
        python: `def singleNumber(nums: list[int]) -> int:
    xor_sum = 0
    for num in nums:
        xor_sum ^= num
    return xor_sum`,
        javascript: `var singleNumber = function(nums) {
    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }
    return xor;
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(1) auxiliary memory",
      whyOptimal:
        "Executes directly inside CPU registers in single clock cycles with zero heap allocation.",
    },
    pattern: "Bit Manipulation / XOR Invariance",
    complexitySummary: {
      time: "O(N)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [4, 1, 2, 1, 2]",
      steps: [
        { stepNumber: 1, state: "init", action: "xor = 0", result: "0" },
        { stepNumber: 2, state: "num = 4", action: "0 ^ 4", result: "4" },
        { stepNumber: 3, state: "num = 1", action: "4 ^ 1", result: "5" },
        { stepNumber: 4, state: "num = 2", action: "5 ^ 2", result: "7" },
        { stepNumber: 5, state: "num = 1", action: "7 ^ 1 (1 cancels out!)", result: "6" },
        { stepNumber: 6, state: "num = 2", action: "6 ^ 2 (2 cancels out!)", result: "4" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Assuming sum(unique) * 2 - sum(nums) handles 64-bit integer overflow safely",
        why: "Multiplying large integers can overflow 32-bit signed limits without `long`.",
        fix: "Use bitwise XOR which is completely immune to arithmetic integer overflow.",
      },
    ],
    variations: [
      "Single Number II (Every element appears 3 times except 1)",
      "Single Number III (Two elements appear once, others appear twice)",
      "Missing Number in array 0 to N",
    ],
    practice: [
      { title: "Single Number II", difficulty: "Medium" },
      { title: "Single Number III", difficulty: "Medium" },
      { title: "Missing Number", difficulty: "Easy" },
    ],
    tags: ["Bit Manipulation", "Array", "XOR"],
    companies: ["Google", "Amazon", "Apple", "Meta", "Microsoft"],
  },
  {
    id: "number-of-1-bits",
    slug: "number-of-1-bits",
    title: "Number of 1 Bits (Hamming Weight)",
    topic: "Bit Manipulation",
    topicSlug: "bit-manipulation",
    subtopic: "Brian Kernighan's Algorithm",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    understandTheProblem:
      "Count how many 1s appear in the binary representation of an integer.",
    constraints: [
      "1 <= n <= 2^31 - 1",
    ],
    examples: [
      {
        input: "n = 11",
        output: "3",
        explanation: "11 in binary is 1011, which has 3 set bits (1s).",
      },
      {
        input: "n = 128",
        output: "1",
        explanation: "128 in binary is 10000000, which has 1 set bit.",
      },
    ],
    hints: [
      "Naive approach: check each of the 32 bits one by one using `(n >> i) & 1`.",
      "Can we skip 0 bits entirely and run in time proportional only to the number of 1s? Look up Brian Kernighan's trick: `n & (n - 1)`.",
    ],
    bruteForce: {
      title: "Approach 1 — Check All 32 Bits",
      intuition:
        "Loop 32 times. On each iteration, check if the least significant bit is 1 with `n & 1`, then right shift `n >>>= 1`.",
      code: {
        java: `public int hammingWeight(int n) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if (((n >> i) & 1) == 1) count++;
    }
    return count;
}`,
        cpp: `int hammingWeight(int n) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if ((n >> i) & 1) count++;
    }
    return count;
}`,
        python: `def hammingWeight(n: int) -> int:
    count = 0
    for i in range(32):
        if (n >> i) & 1:
            count += 1
    return count`,
        javascript: `var hammingWeight = function(n) {
    let count = 0;
    for (let i = 0; i < 32; i++) {
        if ((n >> i) & 1) count++;
    }
    return count;
};`,
      },
      timeComplexity: "O(1) (Fixed 32 iterations)",
      spaceComplexity: "O(1)",
      explanation:
        "Always executes exactly 32 iterations even if the number has only a single 1 bit (e.g. n = 1024).",
    },
    optimalSolution: {
      title: "Approach 2 — Brian Kernighan's Algorithm (O(Count of 1s))",
      intuition:
        "Subtracting 1 from a number flips all bits after the lowest set bit, including the lowest set bit itself. Therefore, `n & (n - 1)` CLEARS the lowest set bit in a single instruction! Repeat until n becomes 0.",
      code: {
        java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1); // Clears the lowest set bit!
        count++;
    }
    return count;
}`,
        cpp: `int hammingWeight(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}`,
        python: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1) # Clears lowest set bit
        count += 1
    return count`,
        javascript: `var hammingWeight = function(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
};`,
      },
      timeComplexity: "O(K) where K is the number of 1 bits (at most 32)",
      spaceComplexity: "O(1) auxiliary memory",
      whyOptimal:
        "Skips all 0 bits entirely. For power-of-two numbers (like 1,073,741,824), it executes in exactly 1 iteration instead of 32.",
    },
    pattern: "Bit Manipulation / Kernighan's",
    complexitySummary: {
      time: "O(K) <= 32",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "n = 11 (binary 1011)",
      steps: [
        { stepNumber: 1, state: "n = 1011 (11)", action: "n = 11 & 10 = 1010 (10)", result: "count = 1" },
        { stepNumber: 2, state: "n = 1010 (10)", action: "n = 10 & 9 = 1000 (8)", result: "count = 2" },
        { stepNumber: 3, state: "n = 1000 (8)", action: "n = 8 & 7 = 0000 (0)", result: "count = 3 (loop terminates!)" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using arithmetic shift >> on negative numbers without unsigned shift",
        why: "In Java, `>>` preserves the sign bit (fills with 1s on negative numbers), causing an infinite loop with `while (n > 0)`.",
        fix: "Use `n &= (n - 1)` or unsigned logical right shift `>>>`.",
      },
    ],
    variations: [
      "Counting Bits (Count set bits for all numbers from 0 to N)",
      "Power of Two Check: `(n > 0) && (n & (n - 1)) == 0`",
    ],
    practice: [
      { title: "Counting Bits", difficulty: "Easy" },
      { title: "Reverse Bits", difficulty: "Easy" },
    ],
    tags: ["Bit Manipulation", "Hamming Weight", "Algorithms"],
    companies: ["Google", "Apple", "Microsoft", "Amazon"],
  },
  {
    id: "counting-bits",
    slug: "counting-bits",
    title: "Counting Bits",
    topic: "Bit Manipulation",
    topicSlug: "bit-manipulation",
    subtopic: "DP with Least Significant Bit Transition",
    difficulty: "Easy",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i. Can you solve it in linear time O(n) and in a single pass without using any built-in functions?",
    understandTheProblem:
      "For every number from 0 to n, we need to count how many bits are turned on (set to 1). Rather than computing each number's bits independently, observe that `i >> 1` is already computed. Since right-shifting by 1 discards only the least significant bit, `ans[i] = ans[i >> 1] + (i & 1)`.",
    constraints: [
      "0 <= n <= 10^5",
    ],
    examples: [
      {
        input: "n = 2",
        output: "[0, 1, 1]",
        explanation: "0 --> 0 (0 bits)\\n1 --> 1 (1 bit)\\n2 --> 10 (1 bit)",
      },
      {
        input: "n = 5",
        output: "[0, 1, 1, 2, 1, 2]",
        explanation: "0 --> 0\\n1 --> 1\\n2 --> 10\\n3 --> 11\\n4 --> 100\\n5 --> 101",
      },
    ],
    hints: [
      "Notice how `i` and `i / 2` (or `i >> 1`) differ in binary: `i` is just `i >> 1` shifted left by 1 with either 0 or 1 appended.",
      "Therefore, the number of 1s in `i` is equal to the number of 1s in `i >> 1` plus `i & 1`.",
      "Alternatively, use Brian Kernighan's transition: `ans[i] = ans[i & (i - 1)] + 1`.",
    ],
    bruteForce: {
      title: "Approach 1 — Per-Number Kernighan's Count",
      intuition:
        "For every number `i` from 0 to n, loop through its set bits using `i = i & (i - 1)` and count how many iterations it takes to reach zero.",
      code: {
        java: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            ans[i] = countOnes(i);
        }
        return ans;
    }

    private int countOnes(int num) {
        int count = 0;
        while (num > 0) {
            num &= (num - 1);
            count++;
        }
        return count;
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 0; i <= n; i++) {
            int count = 0, num = i;
            while (num > 0) {
                num &= (num - 1);
                count++;
            }
            ans[i] = count;
        }
        return ans;
    }
};`,
        python: `class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)
        for i in range(n + 1):
            count = 0
            num = i
            while num > 0:
                num &= (num - 1)
                count += 1
            ans[i] = count
        return ans`,
        javascript: `var countBits = function(n) {
    const ans = new Int32Array(n + 1);
    for (let i = 0; i <= n; i++) {
        let count = 0, num = i;
        while (num > 0) {
            num &= (num - 1);
            count++;
        }
        ans[i] = count;
    }
    return Array.from(ans);
};`,
      },
      timeComplexity: "O(N * K) where K is number of set bits (up to 32) — Up to 32 operations per integer.",
      spaceComplexity: "O(1) auxiliary space beyond the return array.",
      explanation: "Computes each number's Hamming weight independently without reusing previously computed values.",
    },
    optimalSolution: {
      title: "Approach 2 — Dynamic Programming with Least Significant Bit Transition",
      intuition:
        "The binary representation of `i` is identical to `i >> 1` shifted left by 1 position, plus the last bit `i & 1`. Because `i >> 1 < i`, `ans[i >> 1]` has already been computed. Thus, `ans[i] = ans[i >> 1] + (i & 1)` computes every entry in strict O(1) time.",
      code: {
        java: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
};`,
        python: `class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
        return ans`,
        javascript: `var countBits = function(n) {
    const ans = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return Array.from(ans);
};`,
      },
      timeComplexity: "O(N) — Single linear loop with strictly O(1) bitwise operations per iteration.",
      spaceComplexity: "O(1) auxiliary space beyond the output array.",
      explanation: "Reuses subproblem solutions directly via the LSB identity in a single pass.",
      whyOptimal: "Optimal O(N) runtime; each result is computed using exactly two bitwise operations.",
    },
    pattern: "Dynamic Programming / Bit Manipulation",
    complexitySummary: {
      time: "O(N)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "n = 5",
      steps: [
        {
          stepNumber: 1,
          state: "i = 0",
          action: "Base case ans[0] = 0.",
          result: "ans = [0, 0, 0, 0, 0, 0]",
        },
        {
          stepNumber: 2,
          state: "i = 1",
          action: "ans[1] = ans[0] + (1 & 1) = 0 + 1 = 1.",
          result: "ans[1] = 1",
        },
        {
          stepNumber: 3,
          state: "i = 2",
          action: "ans[2] = ans[1] + (2 & 1) = 1 + 0 = 1.",
          result: "ans[2] = 1",
        },
        {
          stepNumber: 4,
          state: "i = 3",
          action: "ans[3] = ans[1] + (3 & 1) = 1 + 1 = 2.",
          result: "ans[3] = 2",
        },
        {
          stepNumber: 5,
          state: "i = 4 and 5",
          action: "ans[4] = ans[2] + 0 = 1. ans[5] = ans[2] + 1 = 2.",
          result: "ans = [0, 1, 1, 2, 1, 2]. Finished.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Operator precedence confusion: `ans[i >> 1] + i & 1`",
        fix: "In Java/C++, addition `+` has higher precedence than bitwise AND `&`. Always use parentheses: `ans[i >> 1] + (i & 1)`.",
      },
    ],
    variations: [
      "Number of 1 Bits (Hamming Weight)",
      "Bitwise AND of Numbers Range",
    ],
    practice: [
      { title: "Number of 1 Bits", difficulty: "Easy" },
      { title: "Reverse Bits", difficulty: "Easy" },
    ],
    tags: ["Dynamic Programming", "Bit Manipulation"],
    companies: ["Google", "Apple", "Microsoft", "Amazon", "Meta"],
  },
  {
    id: "reverse-bits",
    slug: "reverse-bits",
    title: "Reverse Bits",
    topic: "Bit Manipulation",
    topicSlug: "bit-manipulation",
    subtopic: "Bit Reversal / Shifting",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Reverse bits of a given 32 bits unsigned integer.",
    understandTheProblem:
      "We are given a 32-bit unsigned integer. We must reverse its binary representation so that the least significant bit becomes the most significant bit, the 2nd LSB becomes the 2nd MSB, and so forth.",
    constraints: [
      "The input must be a binary string of length 32 representing an unsigned 32-bit integer.",
    ],
    examples: [
      {
        input: "n = 00000010100101000001111010011100",
        output: "964176192 (00111001011110000010100101000000)",
        explanation: "The input binary string reversed represents 964176192 in decimal.",
      },
      {
        input: "n = 11111111111111111111111111111101",
        output: "3221225471 (10111111111111111111111111111111)",
        explanation: "The input binary string reversed represents 3221225471.",
      },
    ],
    hints: [
      "Process bits one by one from right to left (from least significant bit to most significant bit).",
      "In each step, left-shift the result by 1: `result <<= 1`.",
      "Extract the lowest bit of n (`n & 1`) and append it to result: `result |= (n & 1)`.",
      "Right-shift n logically by 1: `n >>>= 1` in Java or `n >>= 1` in C++.",
      "Repeat exactly 32 times.",
    ],
    bruteForce: {
      title: "Approach 1 — String Reversal",
      intuition:
        "Format the integer as a 32-character binary string with leading zeros, reverse the string, and parse it back as an unsigned integer.",
      code: {
        java: `class Solution {
    public int reverseBits(int n) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 32; i++) {
            sb.append((n >>> i) & 1);
        }
        return (int) Long.parseLong(sb.toString(), 2);
    }
}`,
        cpp: `#include <string>
#include <bitset>
using namespace std;

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        string s = bitset<32>(n).to_string();
        reverse(s.begin(), s.end());
        return bitset<32>(s).to_ulong();
    }
};`,
        python: `class Solution:
    def reverseBits(self, n: int) -> int:
        binary_str = f"{n:032b}"
        reversed_str = binary_str[::-1]
        return int(reversed_str, 2)`,
        javascript: `var reverseBits = function(n) {
    let s = (n >>> 0).toString(2).padStart(32, '0');
    let reversed = s.split('').reverse().join('');
    return parseInt(reversed, 2) >>> 0;
};`,
      },
      timeComplexity: "O(1) — 32 characters processed.",
      spaceComplexity: "O(1) — 32-character string allocation.",
      explanation: "Converts binary representation to a string buffer and parses back.",
    },
    optimalSolution: {
      title: "Approach 2 — 32-Step Bit Manipulation (Logical Shift & OR)",
      intuition:
        "Maintain `result = 0`. In a loop running 32 times: shift `result` left by 1 to make space for the incoming bit, add `(n & 1)` using bitwise OR, and logically shift `n` right by 1 using unsigned shift `>>>`.",
      code: {
        java: `class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1; // Logical unsigned right shift
        }
        return result;
    }
}`,
        cpp: `#include <cstdint>
using namespace std;

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};`,
        python: `class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0
        for _ in range(32):
            result = (result << 1) | (n & 1)
            n >>= 1
        return result`,
        javascript: `var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0; // Ensure unsigned 32-bit integer in JS
};`,
      },
      timeComplexity: "O(1) — Exactly 32 constant-time bitwise operations.",
      spaceComplexity: "O(1) — Only one scalar variable maintained.",
      explanation: "Reverses bit stream directly using bitwise operations without intermediate string allocations.",
      whyOptimal: "Zero allocations; operates in 32 CPU clock cycles.",
    },
    pattern: "Bit Manipulation / Bitwise Shifting",
    complexitySummary: {
      time: "O(1)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "n = 1 (binary: 31 zeros followed by 1)",
      steps: [
        {
          stepNumber: 1,
          state: "i = 0, n = 1",
          action: "result = (0 << 1) | 1 = 1. n = 1 >>> 1 = 0.",
          result: "result = 1",
        },
        {
          stepNumber: 2,
          state: "i = 1..31, n = 0",
          action: "31 more iterations each shift result left by 1 and append 0.",
          result: "result = 1 << 31 = 2147483648 (binary 1000...0000).",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using arithmetic shift `>>` instead of logical unsigned shift `>>>` in Java/JS",
        fix: "Arithmetic right shift copies the sign bit, so negative numbers would never shift in 0s. Always use `>>>`.",
      },
      {
        mistake: "Stopping loop when n becomes 0",
        fix: "If you stop when `n == 0`, trailing zeros in `n` won't be shifted to become leading zeros in `result`. The loop must run for all 32 bits.",
      },
    ],
    variations: [
      "Reverse Integer (decimal digit reversal)",
      "Single Number II (3-state finite automaton)",
    ],
    practice: [
      { title: "Number of 1 Bits", difficulty: "Easy" },
      { title: "Single Number", difficulty: "Easy" },
    ],
    tags: ["Divide and Conquer", "Bit Manipulation"],
    companies: ["Google", "Apple", "Microsoft", "Amazon"],
  },
];

