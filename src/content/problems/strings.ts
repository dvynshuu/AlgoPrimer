import { Problem } from "@/types/content";

export const stringProblems: Problem[] = [
  {
    id: "valid-anagram",
    slug: "valid-anagram",
    title: "Valid Anagram",
    topic: "Strings",
    topicSlug: "strings",
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
    topicSlug: "strings",
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
    topicSlug: "strings",
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
  {
    id: "longest-palindromic-substring",
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    topic: "Strings",
    topicSlug: "strings",
    subtopic: "Expand Around Centers",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given a string s, return the longest palindromic substring in s.",
    understandTheProblem:
      "A palindrome reads the exact same forward and backward. We need to identify the longest continuous substring in `s` that satisfies this symmetric property. A palindrome can have an odd length (mirroring across a single center character) or an even length (mirroring across the gap between two identical adjacent characters).",
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters.",
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: 'The substring "bb" is the longest palindrome.',
      },
    ],
    hints: [
      "How many possible centers of symmetry are there in a string of length N? Exactly 2N - 1 (N single characters and N - 1 character pairs).",
      "From each center, expand outward left and right simultaneously as long as `s[left] == s[right]`.",
      "Track the start index and length of the maximum palindrome found across all centers.",
    ],
    bruteForce: {
      title: "Approach 1 — All Substrings with Two-Pointer Palindrome Check",
      intuition:
        "Generate every substring `s[i...j]`. For each substring, verify whether it is a palindrome using two pointers moving inwards.",
      code: {
        java: `class Solution {
    public String longestPalindrome(String s) {
        String longest = "";
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                if (j - i + 1 > longest.length() && isPalindrome(s, i, j)) {
                    longest = s.substring(i, j + 1);
                }
            }
        }
        return longest;
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) return false;
        }
        return true;
    }
}`,
        cpp: `#include <string>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        string longest = "";
        for (int i = 0; i < (int)s.size(); i++) {
            for (int j = i; j < (int)s.size(); j++) {
                int len = j - i + 1;
                if (len > (int)longest.size() && isPalindrome(s, i, j)) {
                    longest = s.substr(i, len);
                }
            }
        }
        return longest;
    }

private:
    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
};`,
        python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        longest = ""
        for i in range(len(s)):
            for j in range(i, len(s)):
                sub = s[i:j + 1]
                if len(sub) > len(longest) and sub == sub[::-1]:
                    longest = sub
        return longest`,
        javascript: `var longestPalindrome = function(s) {
    let longest = "";
    function isPalindrome(l, r) {
        while (l < r) {
            if (s[l++] !== s[r--]) return false;
        }
        return true;
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const len = j - i + 1;
            if (len > longest.length && isPalindrome(i, j)) {
                longest = s.slice(i, j + 1);
            }
        }
    }
    return longest;
};`,
      },
      timeComplexity: "O(N^3) — O(N^2) substrings with an O(N) palindrome check for each.",
      spaceComplexity: "O(1) — Constant memory.",
      explanation: "Tests every combination of start and end indices independently.",
    },
    optimalSolution: {
      title: "Approach 2 — Expand Around Centers",
      intuition:
        "Every palindrome mirrors around its center. A string has `2N - 1` potential centers: `N` odd centers (at character `i`) and `N - 1` even centers (between `i` and `i + 1`). Expanding outward from each center until characters mismatch takes O(N) time per center and uses O(1) space.",
      code: {
        java: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, maxLen = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);     // Odd length
            int len2 = expandAroundCenter(s, i, i + 1); // Even length
            int len = Math.max(len1, len2);

            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }

        return s.substring(start, start + maxLen);
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1; // Length of palindrome
    }
}`,
        cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        int start = 0, maxLen = 0;

        for (int i = 0; i < (int)s.size(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = max(len1, len2);

            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }

        return s.substr(start, maxLen);
    }

private:
    int expand(const string& s, int left, int right) {
        while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};`,
        python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""
        start, max_len = 0, 0

        def expand(left: int, right: int) -> int:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1

        for i in range(len(s)):
            len1 = expand(i, i)
            len2 = expand(i, i + 1)
            length = max(len1, len2)

            if length > max_len:
                max_len = length
                start = i - (length - 1) // 2

        return s[start:start + max_len]`,
        javascript: `var longestPalindrome = function(s) {
    if (!s || s.length < 1) return "";
    let start = 0, maxLen = 0;

    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        const len1 = expand(i, i);
        const len2 = expand(i, i + 1);
        const len = Math.max(len1, len2);

        if (len > maxLen) {
            maxLen = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }

    return s.substring(start, start + maxLen);
};`,
      },
      timeComplexity: "O(N^2) — 2N - 1 centers, each taking at most O(N) expansion steps.",
      spaceComplexity: "O(1) — Constant memory; only records start index and length.",
      explanation: "Expands symmetrically outwards from all potential 2N - 1 center configurations.",
      whyOptimal: "Optimal O(1) space complexity while matching the standard O(N^2) runtime bound.",
    },
    pattern: "Two Pointers / Expand Around Centers",
    complexitySummary: {
      time: "O(N^2)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: 's = "babad"',
      steps: [
        {
          stepNumber: 1,
          state: "i = 0 ('b')",
          action: "expand(0, 0) gives 'b' (len 1). maxLen = 1.",
          result: "max palindrome = 'b'",
        },
        {
          stepNumber: 2,
          state: "i = 1 ('a')",
          action: "expand(1, 1): 'b' == 'b' -> 'bab' (len 3). 3 > 1. start = 1 - 1 = 0.",
          result: "maxLen = 3, palindrome = 'bab'",
        },
        {
          stepNumber: 3,
          state: "i = 2 ('b')",
          action: "expand(2, 2): 'a' == 'a' -> 'aba' (len 3). Does not strictly exceed maxLen 3.",
          result: "maxLen remains 3.",
        },
        {
          stepNumber: 4,
          state: "i = 3 and 4",
          action: "No expansions exceed length 3.",
          result: "Final answer is 'bab'.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking only odd-length centers",
        fix: "Even palindromes like 'cbbd' (palindrome 'bb') center between index i and i + 1. You must test both `expand(i, i)` and `expand(i, i + 1)`.",
      },
      {
        mistake: "Off-by-one formula when deriving start index: `start = i - len / 2`",
        fix: "For odd lengths, `(len - 1) / 2` gives the correct offset (e.g. len 3 at center 1 gives start 0). Always use `start = i - (len - 1) / 2`.",
      },
    ],
    variations: [
      "Palindromic Substrings (count total palindromic substrings)",
      "Longest Palindromic Subsequence (DP on subsequences)",
      "Manacher's Algorithm (O(N) time)",
    ],
    practice: [
      { title: "Palindromic Substrings", difficulty: "Medium" },
      { title: "Longest Palindromic Subsequence", difficulty: "Medium" },
    ],
    tags: ["Two Pointers", "String", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Bloomberg"],
  },
  {
    id: "encode-and-decode-strings",
    slug: "encode-and-decode-strings",
    title: "Encode and Decode Strings",
    topic: "Strings",
    topicSlug: "strings",
    subtopic: "Length Prefix Delimiter / Protocol Serialization",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings. Please implement `encode` and `decode`.",
    understandTheProblem:
      "Because strings can contain any of the 256 valid ASCII characters (including commas, colons, newlines, and escape slashes), we cannot rely on arbitrary delimiters. The industry standard approach (used in HTTP and RPC protocol framing) is chunked length prefixing: write the length of each string, followed by a delimiter, followed by the exact characters.",
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] contains any possible characters among 256 valid ASCII characters.",
    ],
    examples: [
      {
        input: 'strs = ["Hello", "World"]',
        output: '["Hello", "World"]',
        explanation: 'Encoded as "5#Hello5#World" and reliably decoded back.',
      },
      {
        input: 'strs = [""]',
        output: '[""]',
        explanation: 'Empty string encoded as "0#".',
      },
      {
        input: 'strs = ["4#foo", "bar"]',
        output: '["4#foo", "bar"]',
        explanation: 'Even when the content contains "#" or looks like a length header, length-prefixed reading prevents confusion.',
      },
    ],
    hints: [
      "Prepend each string with its length and a separator symbol like '#'. For example: `5#Hello5#World`.",
      "When decoding, read digits until the '#' character. Convert the digits to integer `len`.",
      "Read exactly `len` characters following '#', advance the pointer, and repeat.",
    ],
    bruteForce: {
      title: "Approach 1 — Escaped Delimiter Technique",
      intuition:
        "Choose a delimiter (such as `,`) and escape every occurrence of `,` inside words with `\\,`, and escape every `\\` with `\\\\`.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Codec {
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.replace("\\\\", "\\\\\\\\").replace(",", "\\\\,")).append(",");
        }
        return sb.toString();
    }

    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        StringBuilder curr = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '\\\\') {
                curr.append(s.charAt(i + 1));
                i += 2;
            } else if (s.charAt(i) == ',') {
                res.add(curr.toString());
                curr.setLength(0);
                i++;
            } else {
                curr.append(s.charAt(i));
                i++;
            }
        }
        return res;
    }
}`,
        cpp: `#include <string>
#include <vector>
using namespace std;

class Codec {
public:
    string encode(vector<string>& strs) {
        string res = "";
        for (const string& s : strs) {
            for (char c : s) {
                if (c == '\\\\') res += "\\\\\\\\";
                else if (c == ',') res += "\\\\,";
                else res += c;
            }
            res += ",";
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        string curr = "";
        int i = 0;
        while (i < (int)s.size()) {
            if (s[i] == '\\\\') {
                curr += s[i + 1];
                i += 2;
            } else if (s[i] == ',') {
                res.push_back(curr);
                curr = "";
                i++;
            } else {
                curr += s[i];
                i++;
            }
        }
        return res;
    }
};`,
        python: `class Codec:
    def encode(self, strs: List[str]) -> str:
        return "".join(s.replace("\\\\", "\\\\\\\\").replace(",", "\\\\,") + "," for s in strs)

    def decode(self, s: str) -> List[str]:
        res = []
        curr = []
        i = 0
        while i < len(s):
            if s[i] == "\\\\":
                curr.append(s[i + 1])
                i += 2
            elif s[i] == ",":
                res.append("".join(curr))
                curr = []
                i += 1
            else:
                curr.append(s[i])
                i += 1
        return res`,
        javascript: `var encode = function(strs) {
    return strs.map(s => s.replace(/\\\\/g, "\\\\\\\\").replace(/,/g, "\\\\,")).join(",") + ",";
};

var decode = function(s) {
    const res = [];
    let curr = "";
    let i = 0;
    while (i < s.length) {
        if (s[i] === "\\\\") {
            curr += s[i + 1];
            i += 2;
        } else if (s[i] === ",") {
            res.push(curr);
            curr = "";
            i++;
        } else {
            curr += s[i];
            i++;
        }
    }
    return res;
};`,
      },
      timeComplexity: "O(N) — Scans characters with string replacements.",
      spaceComplexity: "O(N) — Intermediate escaped strings.",
      explanation: "Escapes delimiter characters using backslashes.",
    },
    optimalSolution: {
      title: "Approach 2 — Chunked Length-Prefix Protocol Encoding",
      intuition:
        "For each string `s`, append its length `L`, a delimiter `#`, and the string itself: `L#<content>`. In the decode method, locate the next `#` character to parse integer `L`, slice out the next `L` characters as the string, and jump index forward by `L`.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Codec {
    // Encodes a list of strings to a single string.
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append('#').append(s);
        }
        return sb.toString();
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;

        while (i < s.length()) {
            int hashIdx = s.indexOf('#', i);
            int length = Integer.parseInt(s.substring(i, hashIdx));
            int start = hashIdx + 1;
            res.add(s.substring(start, start + length));
            i = start + length;
        }

        return res;
    }
}`,
        cpp: `#include <string>
#include <vector>
using namespace std;

class Codec {
public:
    string encode(vector<string>& strs) {
        string res = "";
        for (const string& s : strs) {
            res += to_string(s.size()) + "#" + s;
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        int i = 0;
        int n = s.size();

        while (i < n) {
            size_t hashIdx = s.find('#', i);
            int len = stoi(s.substr(i, hashIdx - i));
            int start = hashIdx + 1;
            res.push_back(s.substr(start, len));
            i = start + len;
        }

        return res;
    }
};`,
        python: `class Codec:
    def encode(self, strs: List[str]) -> str:
        return "".join(f"{len(s)}#{s}" for s in strs)

    def decode(self, s: str) -> List[str]:
        res = []
        i = 0
        while i < len(s):
            hash_idx = s.find("#", i)
            length = int(s[i:hash_idx])
            start = hash_idx + 1
            res.append(s[start:start + length])
            i = start + length
        return res`,
        javascript: `var encode = function(strs) {
    let result = "";
    for (const s of strs) {
        result += s.length + "#" + s;
    }
    return result;
};

var decode = function(s) {
    const res = [];
    let i = 0;

    while (i < s.length) {
        const hashIdx = s.indexOf("#", i);
        const length = parseInt(s.slice(i, hashIdx), 10);
        const start = hashIdx + 1;
        res.push(s.slice(start, start + length));
        i = start + length;
    }

    return res;
};`,
      },
      timeComplexity: "O(N) for both encode and decode, where N is the total character count across all strings.",
      spaceComplexity: "O(1) auxiliary memory beyond the encoded and decoded string outputs.",
      explanation: "Embeds explicit chunk lengths, allowing exact string boundaries to be extracted without scanning string contents.",
      whyOptimal: "Strictly linear time and robust against arbitrary ASCII characters including null bytes and delimiters.",
    },
    pattern: "Serialization / Protocol Framing / String Parsing",
    complexitySummary: {
      time: "O(N)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: 'strs = ["lint", "code", "love", "you"]',
      steps: [
        {
          stepNumber: 1,
          state: "encode()",
          action: 'Prepend lengths: "4#lint" + "4#code" + "4#love" + "3#you".',
          result: 'Encoded = "4#lint4#code4#love3#you"',
        },
        {
          stepNumber: 2,
          state: "decode(): i = 0",
          action: "Find '#' at index 1 -> length is 4. Slice s[2...5] ('lint'). Advance i to 6.",
          result: "res = ['lint']",
        },
        {
          stepNumber: 3,
          state: "decode(): i = 6",
          action: "Find '#' at index 7 -> length is 4. Slice s[8...11] ('code'). Advance i to 12.",
          result: "res = ['lint', 'code']",
        },
        {
          stepNumber: 4,
          state: "decode(): Remaining chunks",
          action: "Extract 'love' and 'you' identically.",
          result: "res = ['lint', 'code', 'love', 'you']. Done.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using a single character delimiter without length header",
        fix: "If a string contains the delimiter (e.g. `strs = ['#']`), splitting on `#` will corrupt the output.",
      },
      {
        mistake: "Assuming string length fits in a single digit",
        fix: "Length can be multidigit (e.g., 200). Use `s.indexOf('#', i)` to parse all digits up to the delimiter.",
      },
    ],
    variations: [
      "Serialize and Deserialize Binary Tree",
      "Serialize and Deserialize BST",
    ],
    practice: [
      { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard" },
      { title: "String Compression", difficulty: "Medium" },
    ],
    tags: ["Array", "String", "Design"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Twitter"],
  },
];

