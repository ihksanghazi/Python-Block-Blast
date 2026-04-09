import { Question } from './types';

export const questions: Question[] = [
  // Level 1: Literals
  { id: 'l1_1', prompt: 'Berapa hasil dari ekspresi berikut?', code: '2 + 3', options: ['5', '23', '6', '7'], expectedAnswers: ['5'], hint: 'Cukup hitung 2 + 3', difficulty: 1, blockType: 'small' },
  { id: 'l1_2', prompt: 'Berapa hasil dari ekspresi berikut?', code: '10 - 4', options: ['6', '14', '5', '4'], expectedAnswers: ['6'], hint: 'Kurangi 10 dengan 4', difficulty: 1, blockType: 'small' },
  { id: 'l1_3', prompt: 'Berapa hasil dari ekspresi berikut?', code: '3 * 4', options: ['12', '7', '34', '10'], expectedAnswers: ['12'], hint: 'Kalikan 3 dan 4', difficulty: 1, blockType: 'small' },
  { id: 'l1_4', prompt: 'Apa output dari kode berikut?', code: 'print("hello")', options: ['hello', '"hello"', 'print', 'error'], expectedAnswers: ['hello'], hint: 'print() menampilkan teks tanpa tanda kutip', difficulty: 1, blockType: 'small' },
  { id: 'l1_5', prompt: 'Apa tipe data dari 3.14?', code: 'type(3.14)', options: ['float', 'int', 'str', 'double'], expectedAnswers: ['float'], hint: 'Angka desimal adalah float', difficulty: 1, blockType: 'small' },
  { id: 'l1_6', prompt: 'Berapa hasil dari ekspresi berikut?', code: '10 // 3', options: ['3', '3.33', '4', '1'], expectedAnswers: ['3'], hint: '// adalah pembagian bilangan bulat', difficulty: 1, blockType: 'small' },
  { id: 'l1_7', prompt: 'Berapa hasil dari ekspresi berikut?', code: '10 % 3', options: ['1', '3', '0', '10'], expectedAnswers: ['1'], hint: '% adalah sisa bagi (modulo)', difficulty: 1, blockType: 'small' },
  { id: 'l1_8', prompt: 'Apa tipe data dari 42?', code: 'type(42)', options: ['int', 'float', 'str', 'number'], expectedAnswers: ['int'], hint: '42 adalah integer', difficulty: 1, blockType: 'small' },
  { id: 'l1_9', prompt: 'Berapa hasil dari ekspresi berikut?', code: '2 ** 3', options: ['8', '6', '9', '5'], expectedAnswers: ['8'], hint: '** artinya pangkat. 2^3 = 8', difficulty: 1, blockType: 'small' },
  { id: 'l1_10', prompt: 'Apa output dari kode berikut?', code: 'print("py" + "thon")', options: ['python', 'py thon', 'pythonpython', 'error'], expectedAnswers: ['python'], hint: 'String bisa digabung dengan +', difficulty: 1, blockType: 'small' },

  // Level 2: Lists
  { id: 'l2_1', prompt: 'Manakah list angka 1 sampai 3 yang benar?', options: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', '[1, 2, 3, 4]'], expectedAnswers: ['[1, 2, 3]'], hint: 'Gunakan kurung siku: [1, 2, 3]', difficulty: 2, blockType: 'medium' },
  { id: 'l2_2', prompt: 'Apa elemen pertama dari list berikut?', code: 'x = [10, 20, 30]\nprint(x[0])', options: ['10', '20', '30', '0'], expectedAnswers: ['10'], hint: 'Index dimulai dari 0', difficulty: 2, blockType: 'small' },
  { id: 'l2_3', prompt: 'Berapa panjang list berikut?', code: 'len([5, 10, 15, 20])', options: ['4', '3', '5', '20'], expectedAnswers: ['4'], hint: 'Hitung jumlah elemen', difficulty: 2, blockType: 'medium' },
  { id: 'l2_4', prompt: 'Apa hasil dari operasi berikut?', code: '[1, 2] + [3, 4]', options: ['[1, 2, 3, 4]', '[4, 6]', '[[1,2],[3,4]]', 'error'], expectedAnswers: ['[1, 2, 3, 4]'], hint: 'List bisa digabung dengan +', difficulty: 2, blockType: 'medium' },
  { id: 'l2_5', prompt: 'Apa elemen terakhir dari list berikut?', code: '["a", "b", "c"][-1]', options: ['c', 'a', 'b', '-1'], expectedAnswers: ['c'], hint: 'Index -1 = elemen paling kanan', difficulty: 2, blockType: 'small' },
  { id: 'l2_6', prompt: 'Manakah yang merupakan list kosong?', options: ['[]', '{}', '()', 'None'], expectedAnswers: ['[]'], hint: 'List kosong: []', difficulty: 2, blockType: 'small' },
  { id: 'l2_7', prompt: 'Apa hasil dari ekspresi berikut?', code: '[1, 2, 3][1]', options: ['2', '1', '3', 'error'], expectedAnswers: ['2'], hint: 'Index 1 = elemen kedua', difficulty: 2, blockType: 'small' },
  { id: 'l2_8', prompt: 'Manakah list string yang benar?', options: ['["python", "java"]', '[python, java]', '{"python", "java"}', '(python, java)'], expectedAnswers: ['["python", "java"]'], hint: 'List string dengan kutip dalam kurung siku', difficulty: 2, blockType: 'medium' },
  { id: 'l2_9', prompt: 'Apa hasil dari operasi berikut?', code: '[0] * 3', options: ['[0, 0, 0]', '[0, 3]', '[3]', 'error'], expectedAnswers: ['[0, 0, 0]'], hint: 'List * angka = pengulangan', difficulty: 2, blockType: 'medium' },
  { id: 'l2_10', prompt: 'Apa hasil dari slicing berikut?', code: '[1, 2, 3][:2]', options: ['[1, 2]', '[2, 3]', '[1, 2, 3]', '[1]'], expectedAnswers: ['[1, 2]'], hint: 'Slicing [:2] ambil index 0 dan 1', difficulty: 2, blockType: 'medium' },

  // Level 3: len(), range()
  { id: 'l3_1', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len("python")', options: ['6', '5', '7', '4'], expectedAnswers: ['6'], hint: 'Hitung jumlah karakter', difficulty: 3, blockType: 'medium' },
  { id: 'l3_2', prompt: 'Apa hasil dari ekspresi berikut?', code: 'list(range(3))', options: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', '[3]'], expectedAnswers: ['[0, 1, 2]'], hint: 'range(3) = 0, 1, 2', difficulty: 3, blockType: 'medium' },
  { id: 'l3_3', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len([10, 20, 30, 40])', options: ['4', '3', '40', '100'], expectedAnswers: ['4'], hint: 'Hitung elemen dalam list', difficulty: 3, blockType: 'medium' },
  { id: 'l3_4', prompt: 'Apa hasil dari ekspresi berikut?', code: 'list(range(1, 5))', options: ['[1, 2, 3, 4]', '[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[5]'], expectedAnswers: ['[1, 2, 3, 4]'], hint: 'range(1,5) mulai dari 1 sampai 4', difficulty: 3, blockType: 'medium' },
  { id: 'l3_5', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len("abc") + len("de")', options: ['5', '4', '6', '3'], expectedAnswers: ['5'], hint: '3 + 2 = 5', difficulty: 3, blockType: 'medium' },
  { id: 'l3_6', prompt: 'Apa hasil dari ekspresi berikut?', code: 'list(range(0, 6, 2))', options: ['[0, 2, 4]', '[0, 1, 2, 3, 4, 5]', '[2, 4, 6]', '[0, 6, 2]'], expectedAnswers: ['[0, 2, 4]'], hint: 'range dengan step 2', difficulty: 3, blockType: 'medium' },
  { id: 'l3_7', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len(range(10))', options: ['10', '9', '11', '0'], expectedAnswers: ['10'], hint: 'range(10) punya 10 elemen', difficulty: 3, blockType: 'medium' },
  { id: 'l3_8', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len([])', options: ['0', '1', 'None', 'error'], expectedAnswers: ['0'], hint: 'List kosong panjangnya 0', difficulty: 3, blockType: 'small' },
  { id: 'l3_9', prompt: 'Apa hasil dari ekspresi berikut?', code: 'list(range(5, 8))', options: ['[5, 6, 7]', '[5, 6, 7, 8]', '[6, 7, 8]', '[5, 8]'], expectedAnswers: ['[5, 6, 7]'], hint: 'range(5,8) = 5, 6, 7', difficulty: 3, blockType: 'medium' },
  { id: 'l3_10', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'len("Hello World")', options: ['11', '10', '12', '9'], expectedAnswers: ['11'], hint: 'Spasi juga dihitung', difficulty: 3, blockType: 'medium' },

  // Level 4: Loops
  { id: 'l4_1', prompt: 'Apa output dari kode berikut?', code: 'for i in range(3):\n    print(i)', options: ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '1, 2'], expectedAnswers: ['0, 1, 2'], hint: 'range(3) = 0, 1, 2', difficulty: 4, blockType: 'large' },
  { id: 'l4_2', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'sum(range(4))', options: ['6', '10', '4', '3'], expectedAnswers: ['6'], hint: '0+1+2+3 = 6', difficulty: 4, blockType: 'large' },
  { id: 'l4_3', prompt: 'Apa output dari kode berikut?', code: 'for x in "hi":\n    print(x)', options: ['h, i', 'hi', 'h i', 'error'], expectedAnswers: ['h, i'], hint: 'Loop iterasi setiap karakter', difficulty: 4, blockType: 'large' },
  { id: 'l4_4', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'sum([1, 2, 3, 4])', options: ['10', '4', '24', '8'], expectedAnswers: ['10'], hint: '1+2+3+4 = 10', difficulty: 4, blockType: 'large' },
  { id: 'l4_5', prompt: 'Apa output dari kode berikut?', code: 'for i in range(1, 4):\n    print(i * 2)', options: ['2, 4, 6', '1, 2, 3', '2, 4, 6, 8', '0, 2, 4'], expectedAnswers: ['2, 4, 6'], hint: '1*2, 2*2, 3*2', difficulty: 4, blockType: 'large' },
  { id: 'l4_6', prompt: 'Apa hasil dari list comprehension berikut?', code: '[x**2 for x in range(4)]', options: ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 2, 4, 6]', '[0, 1, 2, 3]'], expectedAnswers: ['[0, 1, 4, 9]'], hint: '0², 1², 2², 3²', difficulty: 4, blockType: 'l-shape' },
  { id: 'l4_7', prompt: 'Berapa panjang list hasil ekspresi berikut?', code: '[x for x in range(10) if x % 2 == 0]', options: ['5', '4', '10', '6'], expectedAnswers: ['5'], hint: 'Bilangan genap 0-9: ada 5', difficulty: 4, blockType: 'l-shape' },
  { id: 'l4_8', prompt: 'Apa output dari kode berikut?', code: 'for i in range(3):\n    print("*" * (i+1))', options: ['*, **, ***', '*, *, *', '***, **, *', '1, 2, 3'], expectedAnswers: ['*, **, ***'], hint: '1 bintang, 2 bintang, 3 bintang', difficulty: 4, blockType: 'l-shape' },
  { id: 'l4_9', prompt: 'Berapa hasil dari ekspresi berikut?', code: 'sum(i for i in range(1, 6))', options: ['15', '21', '10', '6'], expectedAnswers: ['15'], hint: '1+2+3+4+5 = 15', difficulty: 4, blockType: 'large' },
  { id: 'l4_10', prompt: 'Apa hasil dari ekspresi berikut?', code: '"".join([str(i) for i in range(4)])', options: ['0123', '0, 1, 2, 3', '123', '0 1 2 3'], expectedAnswers: ['0123'], hint: 'Gabung 0,1,2,3 tanpa pemisah', difficulty: 4, blockType: 'large' },

  // Level 5: Conditionals
  { id: 'l5_1', prompt: 'Apa output dari kode berikut?', code: 'print("ya" if 5 > 3 else "tidak")', options: ['ya', 'tidak', 'True', 'error'], expectedAnswers: ['ya'], hint: '5 lebih besar dari 3, jadi "ya"', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_2', prompt: 'Apa output dari kode berikut?', code: 'print("genap" if 4 % 2 == 0 else "ganjil")', options: ['genap', 'ganjil', 'True', '0'], expectedAnswers: ['genap'], hint: '4 habis dibagi 2', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_3', prompt: 'Apa output dari kode berikut?', code: 'x = 10\nprint("besar" if x > 5 else "kecil")', options: ['besar', 'kecil', '10', 'True'], expectedAnswers: ['besar'], hint: '10 > 5 jadi "besar"', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_4', prompt: 'Apa hasil dari list comprehension berikut?', code: '[x for x in range(10) if x > 6]', options: ['[7, 8, 9]', '[6, 7, 8, 9]', '[7, 8, 9, 10]', '[8, 9]'], expectedAnswers: ['[7, 8, 9]'], hint: 'Angka > 6 dari 0-9', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_5', prompt: 'Apa output dari kode berikut?', code: 'print(max(3, 7, 1))', options: ['7', '3', '1', '11'], expectedAnswers: ['7'], hint: 'max() cari nilai terbesar', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_6', prompt: 'Apa output dari kode berikut?', code: 'print(min(5, 2, 8))', options: ['2', '5', '8', '15'], expectedAnswers: ['2'], hint: 'min() cari nilai terkecil', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_7', prompt: 'Apa hasil dari ekspresi berikut?', code: 'bool(0)', options: ['False', 'True', '0', 'None'], expectedAnswers: ['False'], hint: '0 bernilai False', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_8', prompt: 'Apa hasil dari ekspresi berikut?', code: 'bool("hello")', options: ['True', 'False', 'hello', 'error'], expectedAnswers: ['True'], hint: 'String tidak kosong = True', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_9', prompt: 'Apa output dari kode berikut?', code: 'print(abs(-7))', options: ['7', '-7', '0', 'error'], expectedAnswers: ['7'], hint: 'abs() = nilai absolut', difficulty: 5, blockType: 't-shape' },
  { id: 'l5_10', prompt: 'Apa hasil dari ekspresi berikut?', code: 'sorted([3, 1, 2])', options: ['[1, 2, 3]', '[3, 2, 1]', '[1, 3, 2]', '[3, 1, 2]'], expectedAnswers: ['[1, 2, 3]'], hint: 'sorted() mengurutkan list', difficulty: 5, blockType: 't-shape' },
];
