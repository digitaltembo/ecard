# Easy E-Card

 <video autoplay muted loop src="https://github.com/user-attachments/assets/8a63baa8-3a62-461b-b458-69d3751f387f">  video </video> 


Rather than use some weird online editor that generates an e-card with an ugly watermark or steals my data, I thought I'd throw together something quick & easy to allow for publishing mostly-private e-cards via GitHub - this repo is my solution, and the e-cards are published under my domain at love.from.nhawk.in/s - the purpose of the /s directory is entirely because my domain name does not quite match my name name.

It should be pretty straightforward to skim through index.html and retheme to whatever you need. It should be not unreasonable to use editor.html to encode your own secretish\* contents.

Contentswise its pretty simple, a little HTML for the front of the card, the inner left side of the card, and the inner right side of the card, and a little CSS3D to make a fancy opening animation. If I was a little less lazy I would have made a 2-sided CSS3d shape, but instead I just try to swap from the front to the inner left at the exact moment the div is perpendicular to the screen.

Because I want to send different cards to different people, and I don't necessarily want people reading eachother's cards, I did a little bit of encryption - there is default contents, but I can also encode different messages by putting different passwords in the url hash. These passwords go through a million rounds of PBKDF2 key derivation to generate a AES-GCM keypair, which is used offline to encrypt some contents (and then store in the messages array in s/index.html) and used online at page load to try decrypting all the message arrays. This is like, maybe a bit secure? A determined person could probably crack reasonably entropic passwords by devoting a few weeks, or maybe I made some errors in vaguely following [BitWarden's security protocols](https://bitwarden.com/help/bitwarden-security-white-paper/) that brings that down by a few orders of magnitude (and leaking the IV and salt probably doesn't help), but for my purposes the messages I have sent out are probably reasonably secure.

Mostly I'm proud of the little animation

 <video autoplay muted loop src="https://github.com/user-attachments/assets/db7632d2-1bcd-44de-89a3-83b9fb65062a">  video </video> 




\* Remember this is hacky security, I would not call anything encoded here actually secure (but I don't know enough to say what about it is not)
