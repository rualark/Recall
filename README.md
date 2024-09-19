# Recall

Recall is an innovative system that secures your sensitive information, like passwords,
by leveraging personal associations unique to your mind instead of traditional authentication methods
(e.g., passwords, biometrics, or OTP apps).

Recall doesn't replace traditional authentication methods but adds an extra layer of security.
You can encrypt your master passwords with Recall as a backup for emergencies,
while continuing to use traditional methods for daily access.

Recall is not quick - it will take 5-20 minutes to securely input your associations (depending on how secure you want it to be).
Therefore, it's typically used in emergencies, such as when you've forgotten your master passwords.

[Open Recall](https://rualark.github.io/recall)

## How it works

Recall transforms your personal memories and associations into a secure key.
Instead of typing in a password or using biometrics, you create associations -
for example matching the names of your favorite games to unique descriptions only you would recognize.
These unique associations become the key to unlock your encrypted data, ensuring only you can access it.
It’s a password method tailored specifically to how your mind naturally works.

## Technical details

For instance, you might describe 30 of your favorite games, with each game name paired with a unique description. These associations form the foundation of the encryption process.

A cryptographic key is derived from the correct pairing of the game names with your personalized descriptions. This key is then used to encrypt your secret data, such as passwords. The associative pairs themselves, remain unencrypted but randomly shuffled.

Recall presents you with a mixed text package containing both encrypted secret data and unencrypted randomly shuffled associative pairs. You can store this package anywhere - disks, clouds, or give them to your friends. To access or modify your secrets, you can paste this encrypted text into the Recaller page. From there, you’ll be prompted to drag and drop associations into their correct pairs. If you match them correctly, your passwords are decrypted and displayed. However, Recall is designed to accommodate the imperfect nature of human memory, so you don't have to match everything perfectly. You can provide multiple answers for each association, and Recall will automatically scan all potential combinations.

Keep in mind that the more answers you add to each question, the longer it will take to check all combinations.

You can also create multiple groups of associations. Each group encrypts the next group, meaning you'll need to answer the first group’s questions correctly before gaining access to the next set of questions.

Recall uses AES-256 encryption for maximum data protection. To defend against brute-force attacks, the key derivation process is strengthened using the PBKDF2 algorithm. This ensures that your secrets remain secure even against determined attackers.
