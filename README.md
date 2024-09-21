# Recall

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rualark_Recall&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rualark_Recall)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rualark_Recall&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rualark_Recall)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rualark_Recall&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rualark_Recall)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rualark_Recall&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rualark_Recall)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rualark_Recall&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rualark_Recall)

[![DeepSource](https://app.deepsource.com/gh/rualark/Recall.svg/?label=active+issues&show_trend=true&token=rlHWezv6AY9K9nfF3vPijtND)](https://app.deepsource.com/gh/rualark/Recall/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/fb48881c99144f2bb87da7dbed5dfddc)](https://app.codacy.com/gh/rualark/Recall/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[Open Recall](https://rualark.github.io/Recall)

Recall is an innovative system that secures your sensitive information, like passwords,
by leveraging personal associations unique to your mind instead of traditional authentication methods
(e.g., passwords, biometrics, or OTP apps).

Recall doesn't replace traditional authentication methods but adds an extra layer of security.
You can encrypt your master passwords with Recall as a backup for emergencies,
while continuing to use traditional methods for daily access.

Recall is not quick - it will take 5-20 minutes to securely input your associations
and decrypt your secrets (depending on how secure you want it to be).
Therefore, it's typically used in emergencies, such as when you've forgotten your master passwords.

## How it works

Recall transforms your personal memories and associations into a secure key.
Instead of typing in a password or using biometrics, you create associations -
for example matching the names of your favorite games to unique descriptions only you would recognize.
These unique associations become the key to unlock your encrypted data, ensuring only you can access it.
It’s a password method tailored specifically to how your mind naturally works.

## Why Recall is safe

- **Open Source**: Recall is fully open source and available on GitHub, so you can inspect, verify, and even contribute to the code yourself.

- **No Data Storage**: Recall is a fully static application. It doesn’t use any storage or databases, meaning it never stores any of your data, ever.

- **Run It Anywhere**: For added security, you can download Recall and run it on your own hosting or even locally on your computer.

- **Strong Encryption**: Recall uses AES-256 encryption, a standard for maximum data protection. It also employs PBKDF2 key derivation to prevent brute-force attacks, ensuring that your secrets are safe even against the most determined threats.

## How to Create Secure Associations

Creating strong, safe associations is the key to Recall's security. Here’s how to make sure your associations are secure:

- **Use at least 17 associations in one group.** This provides strong protection because brute-forcing through 17 associations results in 17! (factorial) combinations—an impractically large number to crack.
  
- **Keep your associations personal.** Only you should know them. Make sure they're private and unique to you.
  
- **Ensure each answer fits well for most of the questions.** Avoid clues that give away obvious context and make it clear that many of the answers will not fit this question.
  
- **Avoid recent memories.** Try not to use memories from the last 2-5 years, as they may fade more quickly over time.
  
- **Choose emotionally charged memories.** Memories tied to strong emotions tend to stick with you longer, making them harder to forget.

- **Multiple associations.** If you describe people that you've met, make sure to describe multiple different situations to each person, so that if you forget one situation, you can remember the other or will be able to catch the general spirit of the hint better.

- **Make sure you can pass your test.** Check how difficult it is to pass your own test, and ideally do it at least once every 1-2 years. If you face difficulties, add more unique hints that only you know or remove/replace some questions. Only keep associations that are easy for you to remember as with time it can become more difficult to recall them.

- **Leverage LLM.** Ask LLM (like ChatGPT) if it can correctly pair your questions and answers. Then ask why it was easy to solve some of the questions - use this to remove universal hints from your questions and replace them with unique personal hints that only you know. Don't forget to shuffle the answers before sending them to LLM, to avoid leaking your associations.

- **Ask your friend to try to pass your test.** Check how many correct answers they have.

- **Avoid basing associations on information that hackers can have.** Social network information, music hubs, photo hubs, documents stored on your computer - all of these can be used by hackers to answer your questions if the stakes are high.

- **Do not store your associations unencrypted.** - You can store the associations you are using in a secure place encrypted with a long password (e.g. Microsoft Word, TrueCrypt, VeraCrypt encryption). Don't worry about losing them. You can always get your associations from your Recall packed data as you know the answers.

If your primary associations contain sensitive information you’d rather not reveal, you can create multiple groups.
Use simpler, less sensitive associations to protect the more critical information in the next group.

## Examples of strong assiciations

All people are different, and some topics may have deeper associations for you, you can use the following list of examples for inspiration:

- **People.** - People you met, what situations happened, what your feelings were about them and situations. Detailed descriptions help to make sure you don't forget.
- **Timeline.** - Your countries, flats, jobs, projects, hobbies - ordered by the timeline. You can specify the years in the questions. Make sure you add hints to avoid ambiguity when solving the puzzle.
- **Something your favorite.** - Games? Music? Movies? Places? Something else? Describe your unique feelings or situations around them and make sure they are personal to you. For example, don't describe what happens in the movie as it will be easy to guess for someone else.

## Technical details

For instance, you might describe 30 of your favorite games, with each game name paired with a unique description. These associations form the foundation of the encryption process.

A cryptographic key is derived from the correct pairing of the game names with your personalized descriptions. This key is then used to encrypt your secret data, such as passwords. The associative pairs themselves, remain unencrypted but randomly shuffled.

Recall presents you with a mixed text package containing both encrypted secret data and unencrypted randomly shuffled associative pairs. You can store this package anywhere - disks, clouds, or give them to your friends. To access or modify your secrets, you can paste this encrypted text into the Recaller page. From there, you’ll be prompted to drag and drop associations into their correct pairs. If you match them correctly, your passwords are decrypted and displayed. However, Recall is designed to accommodate the imperfect nature of human memory, so you don't have to match everything perfectly. You can provide multiple answers for each association, and Recall will automatically scan all potential combinations.

Keep in mind that the more answers you add to each question, the longer it will take to check all combinations.

You can also create multiple groups of associations. Each group encrypts the next group, meaning you'll need to answer the first group’s questions correctly before gaining access to the next set of questions.

## Recall packed message format explained

When Recall encrypts your secrets with your associations, it outputs the colon-separated Base64-encoded message like this:

**RECALL:COMPRESSED_RANDOMLY_SHUFFLED_ASSOCIATIONS:ENCRYPTED_SECRET:SECRET_HASH:DATE**
                
Keep in mind that the encrypted secret can be another recall message of this format -
if you have multiple groups of associations.

## Where to store your Recall packed messages


If your assiciations are safe (see guidelines for safe associations above), it is safe to store the Recall message
on all of your disks, storages, clouds, usb flash and giving them to your friends - as only you will be able to decrypt it.

Avoid making Recall packed messages publicly available to avoid attempts to hack them: although they are considered unhackable today, in the future the new algorithms can be developed.
