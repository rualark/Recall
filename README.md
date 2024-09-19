# Recall

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
  
- **Ensure answers fit well for every question.** Avoid clues that give away obvious context. For example, if the question clearly refers to a man or woman, don't mix genders in the same group, as it makes the associations easier to guess.
  
- **Avoid recent memories.** Try not to use memories from the last 2-5 years, as they may fade more quickly over time.
  
- **Choose emotionally charged memories.** Memories tied to strong emotions tend to stick with you longer, making them harder to forget.

If your primary associations contain sensitive information you’d rather not reveal, you can create multiple groups.
Use simpler, less sensitive associations to protect the more critical information in the next group.

## Technical details

For instance, you might describe 30 of your favorite games, with each game name paired with a unique description. These associations form the foundation of the encryption process.

A cryptographic key is derived from the correct pairing of the game names with your personalized descriptions. This key is then used to encrypt your secret data, such as passwords. The associative pairs themselves, remain unencrypted but randomly shuffled.

Recall presents you with a mixed text package containing both encrypted secret data and unencrypted randomly shuffled associative pairs. You can store this package anywhere - disks, clouds, or give them to your friends. To access or modify your secrets, you can paste this encrypted text into the Recaller page. From there, you’ll be prompted to drag and drop associations into their correct pairs. If you match them correctly, your passwords are decrypted and displayed. However, Recall is designed to accommodate the imperfect nature of human memory, so you don't have to match everything perfectly. You can provide multiple answers for each association, and Recall will automatically scan all potential combinations.

Keep in mind that the more answers you add to each question, the longer it will take to check all combinations.

You can also create multiple groups of associations. Each group encrypts the next group, meaning you'll need to answer the first group’s questions correctly before gaining access to the next set of questions.

## Recall message format explained

When Recall encrypts your secrets with your associations, it outputs the colon-separated Base64-encoded message like this:

RECALL:COMPRESSED_RANDOMLY_SHUFFLED_ASSOCIATIONS:ENCRYPTED_SECRET:SECRET_HASH:DATE
                
Keep in mind that the encrypted secret can be another recall message of this format -
if you have multiple groups of associations.
