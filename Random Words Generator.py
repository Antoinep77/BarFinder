from os.path import dirname, join, realpath
import csv
import numpy as np

path = dirname(realpath(__file__))
csv_path = join(path, "lexicon.csv")

""" The function get_words reads the data and the function random_words returns then n words """

def get_words():
    """"
         Returns the list of all French language words from the http://www.lexique.org:81/lexique database with their frequency of appearance in movies. We've chosen this frequency rather than the frequency of appeareance in the books because the language used for chatting is closer from the spoken language.
Words are filtered according to certain criteria:

    - No conjugated verbs
    - Only nouns / adjectives in the singular
    - A frequency of occurrence > 0

The get_words function returns eleven bimensionnal numpy arrays (names, verbs, adjectives, prepositions, onomatopoiea, adverbs, conjonctions, pronouns, articles, expressions, all_words) containig in their first axis the words and in their second axis the associated frequence. It also returns a dictionary (alias_words) indexed by the values of words_all.

    - words_names contains only names.
    - words_verbs contains only verbs.
    - words_adjectives contains only adjectives.
                ....
    - words_all contains all words.

    - alias_words contains the derivatives of each word (conjugated, plural...)

    """
    words_names = []
    words_verbs = []
    words_adjectives = []
    words_adverbs = []
    words_onomatopoeia = []
    words_prepositions = []
    words_conjonctions = []
    words_pronouns = []
    words_articles = []
    words_expressions = []
    words_all = []

    alias_words = {} # A dictionary with key = word from words_all and value = list from derivative words (plural, conjugated...)
    count_words =  {} # A dictionary with key = word from words_all and value = total frequence (i.e. frequence from the word + frequence from the derivative words (plural, conjugated...))

    # The frequencies aren't normalized : we use these variables to normalize (inside the array) the frequencies of each array at the end.

    freq_nam = 0
    freq_ver = 0
    freq_adj = 0
    freq_adv = 0
    freq_ono = 0
    freq_pre = 0
    freq_con = 0
    freq_pro = 0
    freq_art = 0
    freq_exp = 0
    tot_freq = 0

    cpt = 0

    with open(csv_path) as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            if(cpt != 0): # We ignore the first row
                row[4] = float(row[4])
            else:
                cpt += 1
            if( isinstance(row[4],float) and row[4] > 0): # We free ourselves from useless words, i.e. which never appear
                if (row[2][:3] == 'NOM'): # Noun

                    freq_nam += row[4]

                    if (row[3] != 'p'): # Singular
                        words_names.append([row[0],row[4]])
                        words_all.append([row[0],row[4]])
                        alias_words[row[0]] = alias_words.get(row[0],[]) # Initalize with an empty list if row[0] isn't already a key
                        alias_words[row[0]] += [row[0]]
                        if(row[0] in count_words):
                            count_words[row[0]] += row[4]
                        else:
                            count_words[row[0]] = row[4]
                    else:
                        alias_words[row[1]] = alias_words.get(row[1],[]) # row[1] is the "root word", i.e. the related, singular, non-conjugated word.
                        alias_words[row[1]] += [row[0]]
                        if(row[1] in count_words):
                            count_words[row[1]] += row[4]
                        else:
                            count_words[row[1]] = row[4]

                elif (row[2][:3] == 'VER' or row[2] == 'AUX'): # Verb

                    freq_ver += row[4]

                    if (row[2] == row[5]): # No conjugated
                        words_verbs.append([row[0],row[4]])
                        words_all.append([row[0],row[4]])

                        alias_words[row[0]] = alias_words.get(row[0],[])
                        alias_words[row[0]] += [row[0]]
                        if(row[0] in count_words):
                            count_words[row[0]] += row[4]
                        else:
                            count_words[row[0]] = row[4]
                    else:
                        alias_words[row[1]] = alias_words.get(row[1],[])
                        alias_words[row[1]] += [row[0]]
                        if(row[1] in count_words):
                            count_words[row[1]] += row[4]
                        else:
                            count_words[row[1]] = row[4]


                elif (row[2][:3] == 'ADJ'): # Adjective

                    freq_adj += row[4]

                    if (row[3] == 's'): # Singular
                        if (row[0] == row[1]): # Mascular
                            words_adjectives.append([row[0],row[4]])
                            words_all.append([row[0],row[4]])

                            alias_words[row[0]] = alias_words.get(row[0],[])
                            alias_words[row[0]] += [row[0]]
                            if(row[0] in count_words):
                                count_words[row[0]] += row[4]
                            else:
                                count_words[row[0]] = row[4]
                    else:
                        alias_words[row[1]] = alias_words.get(row[1],[])
                        alias_words[row[1]] += [row[0]]
                        if(row[1] in count_words):
                            count_words[row[1]] += row[4]
                        else:
                            count_words[row[1]] = row[4]

                elif (row[2][:3] == 'ADV'):

                    freq_adv += row[4]

                    words_adjectives.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:3] == 'ONO'):

                    freq_ono += row[4]

                    words_onomatopoeia.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:3] == 'PRE'):

                    freq_pre += row[4]

                    words_prepositions.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:3] == 'PRO'):

                    freq_pro += row[4]

                    words_pronouns.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:3] == 'CON'):

                    freq_con += row[4]

                    words_conjonctions.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:3] == 'ART'):

                    freq_art += row[4]

                    words_articles.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                elif (row[2][:2] == 'NA'):

                    freq_exp += row[4]

                    words_expressions.append([row[0],row[4]])
                    words_all.append([row[0],row[4]])

                    alias_words[row[0]] = [row[0]]
                    count_words[row[0]] = row[4]

                tot_freq += row[4] # We update the total frequence



    for name in words_names :
        name[1] = ( count_words.get(name[0]) / freq_nam )

    for adjective in words_adjectives :
        adjective[1] = ( count_words.get(adjective[0]) / freq_adj )

    for verb in words_verbs :
        verb[1] = ( count_words.get(verb[0]) / freq_ver )

    for preposition in words_prepositions :
        preposition[1] /= freq_pre

    for onomatopoei in words_onomatopoeia :
         onomatopoei[1] /= freq_ono

    for adverb in words_adverbs :
         adverb[1] /= freq_adv

    for conjonction in words_conjonctions :
         conjonction[1] /= freq_con

    for pronoun in words_pronouns :
         pronoun[1] /= freq_pro

    for article in words_articles :
         article[1] /= freq_art

    for expression in words_expressions :
         expression[1] /= freq_exp

    for word in words_all :
         word[1] = ( count_words.get(word[0]) / tot_freq )

    names = np.array(words_names)
    verbs = np.array(words_verbs)
    adjectives = np.array(words_adjectives)
    prepositions = np.array(words_prepositions)
    onomatopoiea = np.array(words_onomatopoeia)
    adverbs = np.array(words_adverbs)
    conjonctions = np.array(words_conjonctions)
    pronouns = np.array(words_pronouns)
    articles = np.array(words_articles)
    expressions = np.array(words_expressions)
    all_words = np.array(words_all)

    return (names, verbs, adjectives, prepositions, onomatopoiea, adverbs, conjonctions, pronouns, articles, expressions, all_words, alias_words)

def random_words(words, n ):
    """ Returns a random draw of n words from the two-dimensional numpy words array, according to their respective frequencies. """
    words_only = []
    freq = []
    for i in range(len(words)):
        words_only.append(words[i][0])
        freq.append(words[i][1])
    return np.random.choice(words_only, n, freq)
