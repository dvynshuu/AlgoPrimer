import { Problem } from "@/types/content";

export const stringProblems: Problem[] = [
  {
    id: "valid-anagram",
    slug: "valid-anagram",
    title: "Valid Anagram",
    topic: "Strings",
    subtopic: "Frequency Array & Hashing",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    understandTheProblem:
      "Two strings are anagrams if both strings contain the exact same characters with the exact same frequencies. Their order can differ, but the counts must match 100%.",
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters.",
    ],
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: 'Both strings have three \'a\'s, one \'g\', one \'m\', one \'n\', and one \'r\'.',
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: 's contains \'t\' whereas t contains \'c\'. The letter frequencies do not match.',
      },
    ],
    hints: [
      "If the lengths of s and t are different, can they ever be anagrams? No, return false immediately.",
      "You can count character frequencies using a fixed-size frequency array of length 26.",
      "Increment counts for characters in s, decrement for characters in t. If all counts end at 0, they are anagrams.",
    ],
    bruteForce: {
      title: "Approach 1 — Sorting Both Strings",
      intuition:
        "Sort the characters of both strings alphabetically. If the sorted strings are identical, then the original strings are anagrams.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sChars = s.toCharArray();
        char[] tChars = t.toCharArray();
        Arrays.sort(sChars);
        Arrays.sort(tChars);
        return Arrays.equals(sChars, tChars);
    }
}`,
        cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};`,
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        return sorted(s) == sorted(t)`,
        javascript: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    return s.split('').sort().join('') === t.split('').sort().join('');
};`,
      },
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n) or O(1) depending on language sorting internals",
      explanation:
        "Sorting takes O(n log n) time. Comparing two strings takes O(n). Overall time is dominated by O(n log n).",
    },
    optimalSolution: {
      title: "Approach 2 — 26-element Fixed Frequency Counter",
      intuition:
        "Since characters are lowercase English letters ('a' through 'z'), maintain a single integer array of size 26. Iterate through both strings: increment the count for each character in `s`, and decrement for each character in `t`. Finally, check if every element in the array is 0.",
      code: {
        java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }

        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;

        int count[26] = {0};
        for (int i = 0; i < s.size(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }

        for (int i = 0; i < 26; i++) {
            if (count[i] != 0) return false;
        }

        return true;
    }
};`,
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        count = [0] * 26
        for c1, c2 in zip(s, t):
            count[ord(c1) - ord('a')] += 1
            count[ord(c2) - ord('a')] -= 1

        return all(c == 0 for c in count)`,
        javascript: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const count = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - base]++;
        count[t.charCodeAt(i) - base]--;
    }

    for (let i = 0; i < 26; i++) {
        if (count[i] !== 0) return false;
    }

    return true;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Single pass over strings of length n. The auxiliary array is fixed at size 26 (constant memory O(1)), achieving the mathematical lower bound.",
    },
    pattern: "Frequency Counting / Direct Addressing",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: 's = "anagram", t = "nagaram"',
      steps: [
        {
          stepNumber: 1,
          state: "lengths both equal 7. Init count[26] with 0s.",
          action: "Process i=0: s[0]='a' -> count[0]++ (1); t[0]='n' -> count[13]-- (-1).",
          result: "count['a']=1, count['n']=-1",
        },
        {
          stepNumber: 2,
          state: "Process remaining characters...",
          action: "Every character in s has an exact counterpart in t that decrements back to 0.",
          result: "All 26 buckets in count array are exactly 0. Return true.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Forgetting to verify string lengths at the beginning",
        fix: "Check `s.length() != t.length()` first to return false in O(1) immediately.",
      },
      {
        mistake: "Using HashMap when character set is bounded to lowercase ASCII",
        fix: "A fixed int[26] array has 0 hash collision overhead, runs cache-friendly, and uses O(1) space.",
      },
    ],
    variations: [
      "Group Anagrams (group list of strings by their anagram equivalence)",
      "Find All Anagrams in a String (sliding window pattern)",
    ],
    practice: [
      { title: "Group Anagrams", difficulty: "Medium" },
      { title: "Find All Anagrams in a String", difficulty: "Medium" },
    ],
    tags: ["String", "Hash Table", "Sorting"],
    companies: ["Amazon", "Uber", "Bloomberg", "TCS", "Adobe"],
  },
  {
    id: "valid-palindrome",
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    topic: "Strings",
    subtopic: "Two Pointers inward",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    understandTheProblem:
      "Ignore spaces, punctuation, symbols, and case sensitivity. Then check if the sanitized sequence of characters reads identically backwards and forwards.",
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters.",
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    hints: [
      "You can avoid creating a new sanitized string by using two pointers directly on the original string.",
      "Increment the left pointer while it's not alphanumeric; decrement the right pointer while it's not alphanumeric.",
      "Compare the lowercase version of both characters.",
    ],
    bruteForce: {
      title: "Approach 1 — Filter and Reverse String",
      intuition:
        "Filter out non-alphanumeric characters into a new lowercase string. Then reverse that string and compare equality.",
      code: {
        java: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                sb.append(Character.toLowerCase(c));
            }
        }
        String filtered = sb.toString();
        String reversed = sb.reverse().toString();
        return filtered.equals(reversed);
    }
}`,
        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        string filtered = "";
        for (char c : s) {
            if (isalnum(c)) {
                filtered += tolower(c);
            }
        }
        string rev = filtered;
        reverse(rev.begin(), rev.end());
        return filtered == rev;
    }
};`,
        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        filtered = [c.lower() for c in s if c.isalnum()]
        return filtered == filtered[::-1]`,
        javascript: `var isPalindrome = function(s) {
    const filtered = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return filtered === filtered.split('').reverse().join('');
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Creates a new filtered string requiring O(n) auxiliary heap allocations.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Pointers In-Place Without Auxiliary Allocation",
      intuition:
        "Place `left = 0` and `right = s.length() - 1`. While `left < right`: skip non-alphanumeric characters from left; skip non-alphanumeric characters from right; compare `toLowerCase(s[left]) == toLowerCase(s[right])`. If mismatched, return false. If loop finishes, return true.",
      code: {
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;

        while (left < right) {
            while (left < right && !isalnum(s[left])) {
                left++;
            }
            while (left < right && !isalnum(s[right])) {
                right--;
            }

            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
};`,
        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1

            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True`,
        javascript: `var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;
    const isAlphaNum = (ch) => /[a-z0-9]/i.test(ch);

    while (left < right) {
        while (left < right && !isAlphaNum(s[left])) {
            left++;
        }
        while (left < right && !isAlphaNum(s[right])) {
            right--;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Iterates over each character at most once. No new string copies or arrays are allocated, keeping memory O(1).",
    },
    pattern: "Two Pointers (Inward Scan)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: 's = "A man, a plan, a canal: Panama"',
      steps: [
        {
          stepNumber: 1,
          state: "left=0 ('A'), right=29 ('a')",
          action: "Both alphanumeric. toLower('A')=='a' == toLower('a')=='a'. Match!",
          result: "left=1, right=28",
        },
        {
          stepNumber: 2,
          state: "left=1 (' '), right=28 ('m')",
          action: "s[1] is space -> skip: left=2 ('m'). Now compare 'm' and 'm'. Match!",
          result: "left=3, right=27",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Out of bounds loop when skipping non-alphanumeric characters",
        fix: "Include `left < right` inside the inner while-loops when advancing `left++` and `right--`.",
      },
      {
        mistake: "Ignoring digits (e.g. comparing only letters)",
        fix: "Alphanumeric characters include numbers '0'-'9'. Use `isLetterOrDigit()` / `isalnum()`.",
      },
    ],
    variations: [
      "Valid Palindrome II (can delete at most one character)",
      "Longest Palindromic Substring",
    ],
    practice: [
      { title: "Valid Palindrome II", difficulty: "Easy" },
      { title: "Longest Palindromic Substring", difficulty: "Medium" },
    ],
    tags: ["Two Pointers", "String"],
    companies: ["Meta", "Microsoft", "Amazon", "Apple"],
  },
  {
    id: "group-anagrams",
    slug: "group-anagrams",
    title: "Group Anagrams",
    topic: "Strings",
    subtopic: "Hash Map Canonical Key",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    understandTheProblem:
      "If words contain the same characters with the same frequencies (like 'eat', 'tea', 'ate'), they belong in the same group. Gather all such words into lists of lists.",
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters.",
    ],
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: 'Grouping words with identical letter counts together.',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: 'Single empty string forms a single group.',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: 'Single character word forms a single group.',
      },
    ],
    hints: [
      "What is an invariant property of anagrams? If you sort the characters of any anagram, they all produce the exact same canonical string!",
      "You can use this canonical string (or a character count tuple) as a key in a Hash Map.",
      "The value for each key is a list of all strings that match that key.",
    ],
    bruteForce: {
      title: "Approach 1 — Pairwise Anagram Check",
      intuition:
        "For each string, compare it with existing groups by checking if it's an anagram of the first element in each group. If none match, start a new group.",
      code: {
        java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<>();
        for (String s : strs) {
            boolean added = false;
            for (List<String> group : result) {
                if (isAnagram(group.get(0), s)) {
                    group.add(s);
                    added = true;
                    break;
                }
            }
            if (!added) {
                List<String> newGroup = new ArrayList<>();
                newGroup.add(s);
                result.add(newGroup);
            }
        }
        return result;
    }

    private boolean isAnagram(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            count[s1.charAt(i) - 'a']++;
            count[s2.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> result;
        for (const string& s : strs) {
            bool added = false;
            for (auto& group : result) {
                if (isAnagram(group[0], s)) {
                    group.push_back(s);
                    added = true;
                    break;
                }
            }
            if (!added) {
                result.push_back({s});
            }
        }
        return result;
    }

    bool isAnagram(const string& s1, const string& s2) {
        if (s1.size() != s2.size()) return false;
        int count[26] = {0};
        for (char c : s1) count[c - 'a']++;
        for (char c : s2) count[c - 'a']--;
        for (int i = 0; i < 26; i++) if (count[i] != 0) return false;
        return true;
    }
};`,
        python: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = []
        for s in strs:
            placed = False
            for g in groups:
                if sorted(g[0]) == sorted(s):
                    g.append(s)
                    placed = True
                    break
            if not placed:
                groups.append([s])
        return groups`,
        javascript: `var groupAnagrams = function(strs) {
    const groups = [];
    for (const s of strs) {
        let placed = false;
        const sSorted = s.split('').sort().join('');
        for (const g of groups) {
            if (g[0].split('').sort().join('') === sSorted) {
                g.push(s);
                placed = true;
                break;
            }
        }
        if (!placed) {
            groups.push([s]);
        }
    }
    return groups;
};`,
      },
      timeComplexity: "O(n^2 * k) where k is max string length",
      spaceComplexity: "O(n * k)",
      explanation:
        "Comparing each string against every existing group takes O(n^2 * k) time in the worst case when all strings have distinct signatures.",
    },
    optimalSolution: {
      title: "Approach 2 — Hash Map with Sorted String Canonical Key",
      intuition:
        "Two strings are anagrams if and only if their sorted character sequences are equal. Use the sorted string as the key in a Hash Map `Map<String, List<String>>`. Collect and return the map's values.",
      code: {
        java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }

        return new ArrayList<>(map.values());
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;

        for (const string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }

        vector<vector<string>> result;
        result.reserve(map.size());
        for (auto& pair : map) {
            result.push_back(move(pair.second));
        }
        return result;
    }
};`,
        python: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = defaultdict(list)

        for s in strs:
            key = "".join(sorted(s))
            groups[key].append(s)

        return list(groups.values())`,
        javascript: `var groupAnagrams = function(strs) {
    const map = new Map();

    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(s);
    }

    return Array.from(map.values());
};`,
      },
      timeComplexity: "O(n * k log k) where n is number of strings and k is max length",
      spaceComplexity: "O(n * k)",
      whyOptimal:
        "Since k <= 100, k log k is small (at most ~664 operations per string). Hash map lookups are O(1) average time. This organizes all anagrams in a single pass.",
    },
    pattern: "Hash Map / Canonical Key Representation",
    complexitySummary: {
      time: "O(n * k log k)",
      space: "O(n * k)",
    },
    dryRun: {
      sampleInput: 'strs = ["eat", "tea", "tan"]',
      steps: [
        {
          stepNumber: 1,
          state: 's="eat", map={}',
          action: 'Sort "eat" -> "aet". Key="aet". map["aet"] = ["eat"]',
          result: 'map has 1 entry',
        },
        {
          stepNumber: 2,
          state: 's="tea", map={"aet": ["eat"]}',
          action: 'Sort "tea" -> "aet". Key exists! Append "tea" to map["aet"]',
          result: 'map["aet"] = ["eat", "tea"]',
        },
        {
          stepNumber: 3,
          state: 's="tan"',
          action: 'Sort "tan" -> "ant". Key="ant". map["ant"] = ["tan"]',
          result: 'map has 2 entries: {"aet": ["eat", "tea"], "ant": ["tan"]}',
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using mutable objects or arrays as keys directly in HashMaps",
        fix: "In Java/C++, use `String` as the map key. In Python, use tuples or joined strings.",
      },
      {
        mistake: "Sum of ASCII values as key (hash collision vulnerability)",
        fix: "Summing ASCII values produces identical sums for different permutations and anagrams (e.g. 'ab' and 'ba' vs other characters summing to same integer). Use character frequency or sorted string.",
      },
    ],
    variations: [
      "Group Shifted Strings",
      "Find All Anagrams in a String",
    ],
    practice: [
      { title: "Valid Anagram", difficulty: "Easy" },
      { title: "Find All Anagrams in a String", difficulty: "Medium" },
    ],
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Uber"],
  },
];
