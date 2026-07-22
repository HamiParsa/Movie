"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../loading";
import { FaSearch, FaPlay, FaStar, FaTimes, FaCalendar, FaFilm, FaClock, FaImdb, FaHeart, FaShare, FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

// ============================================================
// Movies Array
// ============================================================
const movies = [
  {
    id: 1,
    title: "The Super Mario Bros. Movie",
    description:
      "Mario and Luigi tumble into the Mushroom Kingdom, teaming with Princess Peach for goofy battles against Bowser’s wacky schemes, packed with nostalgic game gags. Their slapstick antics make for a wild, laugh-filled ride. This 2023 animated film is pure, silly fun!",
    year: 2023,
    rating: 7,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/the-super-mario-bros-movie_ranzajtk_500x749.jpg?v=1693417374",
    trailerUrl: "https://www.youtube.com/embed/TnGl01FkMMo",
  },
  {
    id: 2,
    title: "Ted Lasso",
    description:
      "An American football coach bumbles into managing a British soccer team, winning hearts with his goofy optimism and quirky motivational tactics. His fish-out-of-water antics spark endless laughs. This 2020-2023 series is a feel-good comedy gem!",
    year: 2020,
    rating: 8.8,
    genre: "Comedy, Drama, Series",
    poster:
      "https://resizing.flixster.com/AWhklm6QkZfQWra2v0lV0VQ_HVY=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvNzU2ZTMxZmEtODlmZC00NDk5LWJlMDAtNWY1OWIwZjYwNDgxLnBuZw==",
    trailerUrl: "https://www.youtube.com/embed/3u7EIiohs6U",
  },
  {
    id: 3,
    title: "Puss in Boots: The Last Wish",
    description:
      "Puss in Boots, down to his last life, teams with a scrappy dog and sassy Death the Wolf for a hilarious quest for a wishing star. Their swashbuckling antics and witty banter deliver non-stop laughs. DreamWorks’ 2022 film is a purr-fectly fun adventure!",
    year: 2022,
    rating: 8.2,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/puss-in-boots-the-last-wish_0joiwrfu_500x749.jpg?v=1653666467",
    trailerUrl: "https://www.youtube.com/embed/tHb7WlgyaUc",
  },
  {
    id: 4,
    title: "The Great",
    description:
      "Catherine the Great navigates 18th-century Russia with sharp wit and absurd schemes, turning royal politics into a hilarious romp. Her quirky power plays and goofy court antics keep the laughs coming. This 2020-2023 series is a wild, satirical delight!",
    year: 2020,
    rating: 8.2,
    genre: "Comedy, Drama, Series",
    poster:
      "https://resizing.flixster.com/QlVe24HzFXLJhCvQ6zeyJx3zAY0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvZjFhMTkwYjItZTNhNi00OWNlLWIzNzMtOTM0OTY3ZjU4NDg4LmpwZw==",
    trailerUrl: "https://www.youtube.com/embed/1kGn2BygGgc",
  },
  {
    id: 5,
    title: "Spy x Family Code: White",
    description:
      "Loid, Yor, and Anya Forger fumble through a spy mission involving a zany cooking contest, with Anya’s telepathic antics causing hilarious chaos. This anime blends espionage with family comedy for laugh-packed fun. A 2023 silly adventure!",
    year: 2023,
    rating: 7.4,
    genre: "Animation, Action, Comedy, Anime",
    poster:
      "https://www.movieposters.com/cdn/shop/files/spyxfamily.codewhite.11x17_480x.progressive.jpg?v=1724768766",
    trailerUrl: "https://www.youtube.com/embed/rv7Z5h5fm6U",
  },
  {
    id: 6,
    title: "The White Lotus",
    description:
      "Wealthy guests at luxury resorts stir up absurd drama with their quirky demands and over-the-top antics, from Hawaii to Sicily. The staff’s bumbling attempts to keep up spark hilarious chaos. This 2021-2025 series is a satirical, silly romp!",
    year: 2021,
    rating: 7.9,
    genre: "Comedy, Drama, Series",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/white-lotus-stylea.11x17_500x749.jpg?v=1682951906",
    trailerUrl: "https://www.youtube.com/embed/TGLf2xI_9TA",
  },
  {
    id: 7,
    title: "Turning Red",
    description:
      "Mei Lee transforms into a giant red panda when excited, causing hilarious chaos with her friends and family in this quirky tale. Her fluffy antics and goofy struggles are pure fun. Pixar’s 2022 animated film is a laugh-filled ride!",
    year: 2022,
    rating: 7,
    genre: "Animation, Comedy, Family",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/turning-red_b17j2w7n_500x749.jpg?v=1650984461",
    trailerUrl: "https://www.youtube.com/embed/XdKzUbAiswI",
  },
  {
    id: 8,
    title: "Mythic Quest",
    description:
      "A dysfunctional video game studio battles egos and absurd deadlines, with quirky coders and a chaotic boss sparking hilarious workplace antics. Their goofy quest for gaming glory never stops entertaining. This 2020-2025 series is a nerdy comedy hit!",
    year: 2020,
    rating: 7.7,
    genre: "Comedy, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWQ3NDRmZjQtOWViNi00MDJkLWJmODEtZjIwM2UxMjI0MmYyXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/1x0oj8qA5cg",
  },
  {
    id: 9,
    title: "Luca",
    description:
      "Sea monster pals Luca and Alberto pretend to be human in a sunny Italian town, chasing scooters and dodging water in hilarious antics. Their fish-out-of-water humor is pure joy. Pixar’s 2021 animated film is a splashy, silly adventure!",
    year: 2021,
    rating: 7.4,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMWMyNGNlZTktODVkNS00ZmMyLTk0NmUtNWVjOWU1MWMzZGMzXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/mYfJxlgR2jw",
  },
  {
    id: 10,
    title: "Our Flag Means Death",
    description:
      "A bumbling aristocrat turned pirate captain leads a ragtag crew through absurd high-seas adventures, with goofy romance and swashbuckling chaos. Their quirky camaraderie is pure hilarity. This 2022-2023 series is a silly, piratey romp!",
    year: 2022,
    rating: 7.8,
    genre: "Comedy, Adventure, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjQ4Mzc5NDMtZjIwNi00ZDlkLTlkOGUtYWNhY2M2NjQzMTFiXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/xVs7lKk3z9w",
  },
  {
    id: 11,
    title: "Encanto",
    description:
      "Mirabel dives into a whirlwind of quirky family magic to save their enchanted home, with catchy songs and goofy chaos galore. Her misadventures are a vibrant riot. Disney’s 2021 animated musical is a silly, colorful delight!",
    year: 2021,
    rating: 7.2,
    genre: "Animation, Family, Musical",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/encanto_svovuwhk_500x749.jpg?v=1636562050",
    trailerUrl: "https://www.youtube.com/embed/CaimKeDcudo",
  },
  {
    id: 12,
    title: "What We Do in the Shadows",
    description:
      "A group of quirky vampires navigate modern life with absurd roommate squabbles and goofy supernatural antics in Staten Island. Their deadpan humor and bizarre schemes keep the laughs flowing. This 2020-2025 series is a hilarious, spooky romp!",
    year: 2020,
    rating: 8.6,
    genre: "Comedy, Fantasy, Series",
    poster: "https://fr.web.img2.acsta.net/pictures/22/06/10/14/57/2139696.jpg",
    trailerUrl: "https://www.youtube.com/embed/6vO8lVe-3gQ",
  },
  {
    id: 13,
    title: "The Bad Guys",
    description:
      "A gang of animal crooks, led by a slick wolf, attempt to go straight in a series of hilarious, botched heists full of snappy banter. Their goofy schemes keep the laughs coming. DreamWorks’ 2022 animated caper is pure criminal fun!",
    year: 2022,
    rating: 6.8,
    genre: "Animation, Comedy, Crime",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/the-bad-guys_ofeu2yhw_500x749.jpg?v=1644514872",
    trailerUrl: "https://www.youtube.com/embed/m8Xt0yXaDPU",
  },
  {
    id: 14,
    title: "Schmigadoon!",
    description:
      "A couple stumbles into a magical town where everyone acts like they’re in a cheesy musical, leading to absurd song-and-dance chaos. Their goofy attempts to escape are pure hilarity. This 2021-2023 series is a silly, tuneful delight!",
    year: 2021,
    rating: 7.4,
    genre: "Comedy, Musical, Series",
    poster:
      "https://resizing.flixster.com/EKEUCu7uUpzXLH0GV36dD4JoxGI=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvOTg5MTM1YjktN2ZiOS00ZTJhLTlkM2QtNWZkNzU4MGY5MmY2LnBuZw==",
    trailerUrl: "https://www.youtube.com/embed/3H0NHeR8pE4",
  },
  {
    id: 15,
    title: "Minions: The Rise of Gru",
    description:
      "Young Gru and his chaotic Minions take on a villainous crew with wacky gadgets and slapstick mayhem, stealing the show with goofy antics. Their wild plans are pure hilarity. This 2022 animated prequel is a riot of silliness!",
    year: 2022,
    rating: 6.5,
    genre: "Animation, Comedy, Adventure",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/minions_the_rise_of_gru_xlg_500x749.jpg?v=1582300382",
    trailerUrl: "https://www.youtube.com/embed/6DxjJzmYsXo",
  },
  {
    id: 16,
    title: "The Afterparty",
    description:
      "A high school reunion turns into a zany murder mystery, with each guest recounting the night in absurd, genre-hopping styles. The quirky suspects and goofy flashbacks keep the laughs coming. This 2022-2023 series is a hilarious whodunit!",
    year: 2022,
    rating: 7.3,
    genre: "Comedy, Mystery, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMGYxNzI1ODItZWM0YS00Nzg1LWIzYjAtN2FkODcxYjdhNTBiXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/_lUz0XAHJ7Q",
  },
  {
    id: 17,
    title: "DC League of Super-Pets",
    description:
      "Krypto the Super-Dog and a ragtag pet crew save the Justice League from a villainous guinea pig, with goofy teamwork and pet-powered chaos. Their quirky antics deliver big laughs. This 2022 animated film is a howling good time!",
    year: 2022,
    rating: 7.1,
    genre: "Animation, Comedy, Action",
    poster:
      "https://www.movieposters.com/cdn/shop/products/dc-league-of-super-pets_dszp5iwz_480x.progressive.jpg?v=1639776438",
    trailerUrl: "https://www.youtube.com/embed/1jkw2JP_e2k",
  },
  {
    id: 18,
    title: "Hacks",
    description:
      "A veteran comedian and a young writer form a quirky duo, navigating the absurd world of stand-up with snarky banter and hilarious mishaps. Their odd-couple chemistry is pure fun. This 2021-2025 series is a sharp, silly comedy!",
    year: 2021,
    rating: 8.2,
    genre: "Comedy, Drama, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMGI5NTE0ODMtOTdlYS00MjY1LWE0ZWUtZTg2M2FmZmUwZGMwXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/6vO8lVe-3gQ",
  },
  {
    id: 19,
    title: "Ron's Gone Wrong",
    description:
      "Barney’s glitchy robot pal Ron causes hilarious chaos with malfunctioning antics, turning social media mishaps into laugh-out-loud adventures. Their quirky friendship is pure fun. This 2021 animated film is a techy, silly blast!",
    year: 2021,
    rating: 7,
    genre: "Animation, Comedy, Sci-Fi",
    poster:
      "https://www.movieposters.com/cdn/shop/products/rons-gone-wrong_6mrd9trb_480x.progressive.jpg?v=1637342410",
    trailerUrl: "https://www.youtube.com/embed/8I8nM12iEIw",
  },
  {
    id: 20,
    title: "Ghosts",
    description:
      "A young couple inherits a haunted mansion, dealing with quirky ghosts who stir up absurd, laugh-filled chaos with their afterlife antics. Their goofy interactions are pure comedy gold. This 2021-2025 series is a spooky, silly delight!",
    year: 2021,
    rating: 7.9,
    genre: "Comedy, Fantasy, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOGUxMmFjMjYtODQ2ZS00YTNiLWFjNDktNTRhMzgyYjcyOTMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/Yv3vA30B7cA",
  },
  {
    id: 21,
    title: "The Addams Family 2",
    description:
      "The spooky Addams clan hits the road for a wacky family vacation, stirring up creepy and kooky chaos across America. Their oddball antics and gothic humor keep the laughs rolling. This 2021 animated sequel is delightfully weird!",
    year: 2021,
    rating: 5.4,
    genre: "Animation, Comedy, Family",
    poster:
      "https://www.movieposters.com/cdn/shop/products/the-addams-family-2_ahf6e7hl_480x.progressive.jpg?v=1628180071",
    trailerUrl: "https://www.youtube.com/embed/KaQ6O5a0o9Q",
  },
  {
    id: 22,
    title: "Reservation Dogs",
    description:
      "Four Indigenous teens in rural Oklahoma pull off goofy heists and dream of escaping to California, with quirky humor and heartfelt antics. Their small-town shenanigans are laugh-out-loud fun. This 2021-2023 series is a fresh, silly gem!",
    year: 2021,
    rating: 8.2,
    genre: "Comedy, Drama, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjA5ZTdkOWYtNmMzYy00ZmM0LTg3YWYtNDgyODY5OTIxN2RlXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/2y4a0i-la8E",
  },
  {
    id: 23,
    title: "Vivo",
    description:
      "Vivo, a music-loving kinkajou, embarks on a zany journey from Havana to Miami to deliver a love song, joined by quirky teen Gabi. Their musical misadventures are packed with colorful chaos. This 2021 animated film is a lively, silly romp!",
    year: 2021,
    rating: 6.7,
    genre: "Animation, Musical, Comedy",
    poster:
      "https://m.media-amazon.com/images/S/pv-target-images/b05a6ff4240cfa89037ff30ca1cbae90828e38e33caf145f5104453b64eab8b3.jpg",
    trailerUrl: "https://www.youtube.com/embed/Bid3R17OJxk",
  },
  {
    id: 24,
    title: "Solar Opposites",
    description:
      "A family of aliens crashes on Earth, bickering through absurd suburban adventures with goofy sci-fi gadgets and wild schemes. Their quirky culture clashes are pure hilarity. This 2020-2025 animated series is a zany, laugh-filled romp!",
    year: 2020,
    rating: 8,
    genre: "Animation, Comedy, Sci-Fi, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOThkYmE3YjQtYmRhYS00Yjg4LTg5OWEtZDNiYjk1MTViZDRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/5hHoKjcH71g",
  },
  {
    id: 25,
    title: "Paw Patrol: The Movie",
    description:
      "Ryder and his pup squad race to Adventure City to stop a bumbling mayor’s wild plans, unleashing goofy rescues and puppy-powered chaos. The pups’ silly heroics are family-friendly fun. This 2021 animated film is a tail-wagging delight!",
    year: 2021,
    rating: 6.1,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan003_ddbce9fb-841c-434f-a15f-cc3a14e67640_500x749.jpg?v=1692109105",
    trailerUrl: "https://www.youtube.com/embed/yaRxCIrUqbU",
  },
  {
    id: 26,
    title: "The Mitchells vs. The Machines",
    description:
      "The quirky Mitchell family battles a rogue AI and its goofy robot army in a hilarious road-trip apocalypse, saving the day with absurd humor. Their oddball teamwork is pure chaos. This 2021 animated film is a laugh-filled adventure!",
    year: 2021,
    rating: 7.6,
    genre: "Animation, Comedy, Sci-Fi",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzAyOWNiMjAtNWUzMi00ZDk1LWE5NzYtNDUzMWE1Y2M0NDM2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/_ak5jID8h3s",
  },
  {
    id: 27,
    title: "Trolls World Tour",
    description:
      "Poppy and Branch unite musical troll tribes against a rock ‘n’ roll takeover, sparking glittery chaos and catchy songs. Their silly antics make for a colorful party. This 2020 animated sequel is a poppy blast of fun!",
    year: 2020,
    rating: 6.1,
    genre: "Animation, Musical, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/trolls-world-tour_6h8ifclo_500x749.jpg?v=1614117158",
    trailerUrl: "https://www.youtube.com/embed/6i01tOMgBDU",
  },
  {
    id: 28,
    title: "The Croods: A New Age",
    description:
      "The prehistoric Croods clash with the snooty Bettermans in a goofy caveman vs. modern family battle, sparking wild jungle antics. Their silly rivalry delivers big laughs. DreamWorks’ 2020 animated sequel is a stone-age riot!",
    year: 2020,
    rating: 6.9,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://www.movieposters.com/cdn/shop/products/croods2.web_480x.progressive.jpg?v=1605811290",
    trailerUrl: "https://www.youtube.com/embed/GG7w2j3Vq9M",
  },
  {
    id: 29,
    title: "Soul",
    description:
      "Joe Gardner lands in a quirky afterlife mentoring a mischievous soul, sparking hilarious cosmic mishaps with goofy charm. Their antics explore life’s joys in a fun way. Pixar’s 2020 animated film is a soulful, silly adventure!",
    year: 2020,
    rating: 8,
    genre: "Animation, Comedy, Fantasy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan009_ee8f8446-bc66-48f6-accc-d6d2210a4557_500x749.jpg?v=1672862954",
    trailerUrl: "https://www.youtube.com/embed/Gs--6c7Hn_A",
  },
  {
    id: 30,
    title: "Onward",
    description:
      "Elf brothers Ian and Barley fumble through a zany magical quest to bring back their dad, tripping over spells in suburban chaos. Their goofy brotherly antics are laugh-out-loud fun. Pixar’s 2020 animated film is a magical romp!",
    year: 2020,
    rating: 7.4,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ab52b4cc44c6800afbfbe1c389702faf_500x749.jpg?v=1573572622",
    trailerUrl: "https://www.youtube.com/embed/gn5QmllRCn4",
  },
  {
    id: 31,
    title: "Elemental",
    description:
      "Ember, a fiery elemental, and Wade, a watery goofball, spark a quirky romance in a city of clashing elements, causing hilarious mix-ups. Their odd-couple chemistry is pure fun. Pixar’s 2023 animated film is a sizzling, silly love story!",
    year: 2023,
    rating: 7,
    genre: "Animation, Comedy, Romance",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/elemental_tomljblz_500x749.jpg?v=1669383545",
    trailerUrl: "https://www.youtube.com/embed/hXzcyx9V0xw",
  },
  {
    id: 32,
    title: "Nimona",
    description:
      "Nimona, a shapeshifting teen, teams with a knight for a rebellious adventure, causing chaos with her prankster antics. Their quirky duo delivers laughs galore. This 2023 animated film is a bold, silly gem!",
    year: 2023,
    rating: 7.5,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZLqajnMHzcjnCiquNmCT5fN1uNzEHgnLCnkFfye-3R2ZQtoAUKhHk2mPPtTQ8epS1nhbZNmagpT88FSqTSd_MinjrBr_UBkI46sWxz9T-bha93CVYpkL9RieunRigg3bf54WA.jpg?r=ab2",
    trailerUrl: "https://www.youtube.com/embed/8inY",
  },
  {
    id: 33,
    title: "Sonic the Hedgehog 3",
    description:
      "Sonic, Knuckles, and Tails zip through a high-speed adventure with goofy punches and quirky gadgets against a new villain. The fast-paced humor is a blast. This 2024 animated hybrid is a sonic boom of fun!",
    year: 2024,
    rating: 7.3,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/sonic-the-hedgehog-3_8j4w7hyp_500x749.jpg?v=1732810486",
    trailerUrl: "https://www.youtube.com/embed/qSuq0UrT-wI",
  },
  {
    id: 34,
    title: "The Casagrandes Movie",
    description:
      "Ronnie Anne and her wacky family head to Mexico for a birthday adventure, stumbling into a magical treasure hunt full of goofy chaos. Their loud, loving antics bring the laughs. This 2024 animated film is a vibrant, silly fiesta!",
    year: 2024,
    rating: 6.8,
    genre: "Animation, Comedy, Family",
    poster:
      "https://occ-0-1015-299.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABfdWJjI9IskEwl9i3Kar-7JADeyiqD3ldtnFji37-hpLoYrJ4J75UzQUqKXlONPebSc97FN1LhKQV7I0O3j028x8QSiblvRs2gMP-0FDz7c_3plH-pSHhrJZPra6CdI8m33BGQ.jpg?r=16f",
    trailerUrl: "https://www.youtube.com/embed/BGGAU-95W8g",
  },
  {
    id: 35,
    title: "Mufasa: The Lion King",
    description:
      "Young Mufasa’s rise to king is a wild ride of sibling rivalry and goofy jungle adventures, with catchy songs and lion-sized laughs. His journey is epic and silly. Disney’s 2024 animated prequel is a roaring good time!",
    year: 2024,
    rating: 7.5,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/scan003_15ae586d-23aa-4de9-990b-ac5cdc4f98ef_500x749.jpg?v=1730487377",
    trailerUrl: "https://www.youtube.com/embed/MjQG-a7d41Q",
  },
  {
    id: 36,
    title: "Bluey: The Movie",
    description:
      "Bluey, the lovable Aussie pup, and her family turn a backyard game into an epic, goofy quest packed with playful antics and kid-friendly humor. Their silly adventures spark endless fun. This 2025 animated film is a heartwarming romp! (Poster placeholder; replace with Amazon URL post-release)",
    year: 2025,
    rating: 7.6,
    genre: "Animation, Family, Comedy",
    poster: "https://www.bluey.tv/wp-content/uploads/2020/07/Featherwand.png",
    trailerUrl: "https://www.youtube.com/embed/placeholder",
  },
  {
    id: 37,
    title: "The SpongeBob Movie: Search for SquarePants",
    description:
      "SpongeBob and his Bikini Bottom pals dive into a zany treasure hunt, tripping over absurd obstacles and goofy gags. Their wacky antics keep the laughs flowing. This 2025 animated film is a splashy, silly adventure! (Poster placeholder; replace with Amazon URL post-release)",
    year: 2025,
    rating: 7.4,
    genre: "Animation, Comedy, Adventure",
    poster:
      "https://www.movieposters.com/cdn/shop/files/spongebob_movie_search_for_squarepants_ver2_480x.progressive.jpg?v=1755876751",
    trailerUrl: "https://www.youtube.com/embed/placeholder",
  },
  {
    id: 38,
    title: "Kung Fu Panda 4",
    description:
      "Po, the bumbling Dragon Warrior, trains a new hero while battling a shape-shifting villain, causing hilarious martial arts chaos. His goofy antics keep the laughs coming. DreamWorks’ 2024 animated sequel is a kickin’ good time!",
    year: 2024,
    rating: 6.3,
    genre: "Animation, Action, Comedy",
    poster:
      "https://www.movieposters.com/cdn/shop/files/kung_fu_panda_four_480x.progressive.jpg?v=1703794332",
    trailerUrl: "https://www.youtube.com/embed/_inKs4eeHiI",
  },
  {
    id: 39,
    title: "The Wild Robot",
    description:
      "Roz, a shipwrecked robot, becomes a goofy adoptive mom to a gosling on a wild island, learning survival with quirky animal pals. Her bumbling efforts spark laughs and heart. This 2024 animated film is a charming, silly adventure!",
    year: 2024,
    rating: 7.2,
    genre: "Animation, Comedy, Family",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/wild_robot_500x749.jpg?v=1710787263",
    trailerUrl: "https://www.youtube.com/embed/yEG2VTHS9yg",
  },
  {
    id: 40,
    title: "Palm Springs",
    description:
      "Two strangers get stuck in a zany time loop at a wedding, sparking absurd antics and goofy romance as they try to break free. Their quirky schemes are laugh-out-loud fun. This 2020 sci-fi comedy film is a wild, silly ride!",
    year: 2020,
    rating: 7.4,
    genre: "Comedy, Romance, Sci-Fi",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2VkNGY0MTMtMjEzZi00OThkLWJiOTMtNGU4ZGNjZDE5ZGIyXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/CpBLtXduh_k",
  },
  {
    id: 41,
    title: "Barb and Star Go to Vista Del Mar",
    description:
      "Two quirky friends embark on a wild vacation, stumbling into absurd spy plots and goofy musical numbers in a sunny paradise. Their over-the-top antics are pure hilarity. This 2021 comedy film is a zany, laugh-filled romp!",
    year: 2021,
    rating: 6.3,
    genre: "Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDY1MzUxYjItN2Y3Yi00YWUxLTgyZDYtOTBmYTBlNjUwNTlkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/0TR7q6AGrM0",
  },
  {
    id: 42,
    title: "The Unbearable Weight of Massive Talent",
    description:
      "Nicolas Cage plays himself in a zany meta-adventure, teaming with a quirky fan for absurd spy antics and over-the-top action. His self-parodying humor delivers big laughs. This 2022 comedy film is a wild, silly tribute!",
    year: 2022,
    rating: 7,
    genre: "Comedy, Action",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMWEzMTA3MjAtOTkwYS00ZTNlLWIzYzMtMDIxNzU0NTlkMGRlXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/x2YJZZksT04",
  },
  {
    id: 43,
    title: "Everything Everywhere All at Once",
    description:
      "A laundromat owner jumps through absurd multiverses, wielding goofy weapons like hot dogs and googly eyes to save reality. The chaotic humor and quirky family antics are pure fun. This 2022 sci-fi comedy film is a wild, silly masterpiece!",
    year: 2022,
    rating: 7.8,
    genre: "Comedy, Sci-Fi, Adventure",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/everything-everywhere-all-at-once_nysayfbn_500x749.jpg?v=1648143747",
    trailerUrl: "https://www.youtube.com/embed/wxN1T1uxQ2g",
  },
  {
    id: 44,
    title: "Bullet Train",
    description:
      "A hapless assassin boards a zany high-speed train packed with quirky killers, sparking absurd fights and goofy mix-ups galore. The chaotic humor keeps the laughs rolling. This 2022 action-comedy film is a wild, silly ride!",
    year: 2022,
    rating: 7.3,
    genre: "Action, Comedy",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/scan007_2c4fa211-6813-4fb9-9560-871839587262_500x749.jpg?v=1656080770",
    trailerUrl: "https://www.youtube.com/embed/0IOsk2Vlc4o",
  },
  {
    id: 45,
    title: "The Lost City",
    description:
      "A romance novelist and her cover model bumble through a jungle adventure, dodging quirky villains and sparking goofy chemistry. Their absurd misadventures are laugh-out-loud fun. This 2022 comedy film is a zany, tropical romp!",
    year: 2022,
    rating: 6.1,
    genre: "Comedy, Adventure",
    poster:
      "https://resizing.flixster.com/fo6Ukr9hppKUyhiAn6nGrkbT8Sw=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2NjYjMwYWRjLTYxMjQtNDE4NS04N2VjLTNkYTM0NGY1ZWM2Yy5qcGc=",
    trailerUrl: "https://www.youtube.com/embed/nfKO9rM2a3o",
  },
  {
    id: 46,
    title: "Bottoms",
    description:
      "Two awkward teens start a fight club to woo cheerleaders, leading to absurd high school chaos and goofy schemes. Their quirky antics deliver non-stop laughs. This 2023 comedy film is a wild, silly teen romp!",
    year: 2023,
    rating: 6.8,
    genre: "Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzEyNTNlNDAtNTMxOC00YzMzLWFkM2QtZmRiNGE5ZTQyMWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/8kJ-jQeQjYY",
  },
  {
    id: 47,
    title: "Dungeons & Dragons: Honor Among Thieves",
    description:
      "A ragtag group of misfits embarks on a zany fantasy heist, bumbling through magical traps and goofy monster fights. Their quirky teamwork sparks endless laughs. This 2023 adventure-comedy film is a rollicking, silly quest!",
    year: 2023,
    rating: 7.3,
    genre: "Adventure, Comedy, Fantasy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOGRjMjQ0ZDAtODc0OS00MGY1LTkxMTMtODhhNjY5NTM4N2IwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/IiMinixSXII",
  },
  {
    id: 48,
    title: "Chicken Run: Dawn of the Nugget",
    description:
      "The plucky chickens stage a daring, hilarious breakout from a high-tech farm, with goofy new recruits joining the flock. Their clucky schemes are laugh-out-loud chaos. Aardman’s 2023 animated sequel is a feathered frenzy!",
    year: 2023,
    rating: 6.4,
    genre: "Animation, Comedy, Adventure",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOTMwN2Y0MDYtYzhhZS00YzI5LWE5N2UtOThlZWQxODc4YjkxXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/_-3J5n8Ybs4",
  },
  {
    id: 49,
    title: "Leo",
    description:
      "Leo, a wise-cracking classroom lizard, helps kids with hilarious advice and zany antics, sneaking through school for goofy adventures. His quirky wisdom sparks big laughs. This 2023 animated film is a charming, silly comedy!",
    year: 2023,
    rating: 7,
    genre: "Animation, Comedy, Family",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjdiNmZhNzctMjEzNi00OGM4LWEzYTctZWYxNzY5NTBjZTYzXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/G_AEL-XoYrc",
  },
  {
    id: 50,
    title: "The Day the Earth Blew Up: A Looney Tunes Movie",
    description:
      "Daffy Duck and Porky Pig stumble into a zany alien invasion plot, saving the world with slapstick antics and wild schemes. Their goofy duo delivers non-stop laughs. This 2024 animated film is a looney blast!",
    year: 2024,
    rating: 6.9,
    genre: "Animation, Comedy, Sci-Fi",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOTgxODk4OTQtMjc2MC00NGRmLWJlMmMtNTdlZjI1NDE0NzE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/R-Wa3V4M5ts",
  },
  {
    id: 51,
    title: "Borat Subsequent Moviefilm",
    description:
      "Borat returns to America with his daughter, stirring up absurd pranks and outrageous interviews that spiral into hilarious chaos. His over-the-top antics are pure comedic madness. This 2020 mockumentary is a laugh-out-loud riot!",
    year: 2020,
    rating: 6.6,
    genre: "Comedy",
    poster:
      "https://www.hollywoodreporter.com/wp-content/uploads/2021/02/Borat_PV-scaled-1.jpg?w=700&h=1037&crop=1",
    trailerUrl: "https://www.youtube.com/embed/0Rsa4U8nnOI",
  },
  {
    id: 52,
    title: "Upload",
    description:
      "A tech nerd wakes up in a virtual afterlife, navigating glitchy paradise with quirky characters and absurd digital mishaps. The goofy tech satire keeps the laughs coming. This 2020-2025 series is a hilarious sci-fi romp!",
    year: 2020,
    rating: 7.9,
    genre: "Comedy, Sci-Fi, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYzYzOTY3MzctOTQ1ZC00NjRlLTljMzMtNDI0OWE1N2I4YTdhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/eBKSg8V3dPQ",
  },
  {
    id: 53,
    title: "Raya and the Last Dragon",
    description:
      "Raya teams up with a sassy dragon, Sisu, for a zany quest across a fractured world, dodging traps with goofy banter and magical chaos. Their quirky teamwork sparks big laughs. Disney’s 2021 animated adventure is a fun-filled romp!",
    year: 2021,
    rating: 7.3,
    genre: "Animation, Adventure, Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2QzZTQ3MzktN2JiYS00MDEzLTgxMWQtZWFmMDI3NWFkZTY0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/1VIZ89FEjYI",
  },
  {
    id: 54,
    title: "Death to 2020",
    description:
      "A mockumentary skewers the chaotic year with absurd commentary from quirky fake experts, delivering sharp satire and goofy takes on real events. The over-the-top humor is relentless. This 2020 special is a silly, biting romp!",
    year: 2020,
    rating: 6.8,
    genre: "Comedy, Special",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMWJmOGQ0OWMtYTc4NS00MjQyLWEyMjgtYmFhOWYxYzRiNGY3XkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/XeDbyV1vC9c",
  },
  {
    id: 55,
    title: "WandaVision",
    description:
      "Wanda and Vision live in a bizarre sitcom world, unraveling quirky mysteries with goofy homages to classic TV tropes. Their oddball antics keep the laughs coming. This 2021 series is a surreal, silly Marvel delight!",
    year: 2021,
    rating: 8,
    genre: "Comedy, Fantasy, Series",
    poster:
      "https://m.media-amazon.com/images/I/91boO4r6UML._UF894,1000_QL80_.jpg",
    trailerUrl: "https://www.youtube.com/embed/sj9J2ecsSpo",
  },
  {
    id: 56,
    title: "Sing 2",
    description:
      "Buster Moon’s animal crew stages a wild musical extravaganza, juggling goofy auditions and absurd showbiz chaos to impress a reclusive rock star. Their zany efforts spark non-stop laughs. This 2021 animated sequel is a tuneful riot!",
    year: 2021,
    rating: 7.4,
    genre: "Animation, Comedy, Musical",
    poster:
      "https://themoviespoiler.com/wp-content/uploads/2021/11/sing_two_ver23.jpg",
    trailerUrl: "https://www.youtube.com/embed/TPcV_3D3V2A",
  },
  {
    id: 57,
    title: "The Book of Boba Fett",
    description:
      "Boba Fett and his quirky sidekick Fennec Shand take over Tatooine’s underworld, bumbling through absurd power struggles and goofy alien antics. Their odd-couple dynamic is pure fun. This 2021-2022 series is a Star Wars comedy gem!",
    year: 2021,
    rating: 7.2,
    genre: "Sci-Fi, Comedy, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2JlY2NkOWItYjAyZS00Yzc5LWE4ZWEtMGY2NzBlZDkzNjYzXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/rOJ1cw6mohw",
  },
  {
    id: 58,
    title: "Free Guy",
    description:
      "A bank teller discovers he’s an NPC in a wild video game world, sparking goofy heroics and absurd battles against glitchy villains. His quirky rebellion is laugh-out-loud fun. This 2021 action-comedy is a digital blast!",
    year: 2021,
    rating: 7.1,
    genre: "Comedy, Action, Sci-Fi",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/free-guy_1xfacsl5_500x749.jpg?v=1624549634",
    trailerUrl: "https://www.youtube.com/embed/X2m-08cOAbc",
  },
  {
    id: 59,
    title: "The Bubble",
    description:
      "A group of actors gets trapped in a pandemic-era hotel filming a cheesy dinosaur movie, leading to absurd meltdowns and goofy production chaos. Their over-the-top antics are pure hilarity. This 2022 comedy film is a zany Hollywood satire!",
    year: 2022,
    rating: 4.7,
    genre: "Comedy",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJhNjdiY2YtZjExMS00MzljLWEyNWEtMWVjMGYzMGNiNzFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/VWjH7qng3w0",
  },
  {
    id: 60,
    title: "Central Park",
    description:
      "A quirky family manages New York’s Central Park, juggling absurd park mishaps and goofy musical numbers with wild characters. Their chaotic antics spark endless laughs. This 2020-2022 animated series is a tuneful, silly romp!",
    year: 2020,
    rating: 6.9,
    genre: "Animation, Comedy, Musical, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMWEwYzIxNTEtYjM5MS00YzdjLTkwNDgtYjU4ZTUyYzA4MDUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/0oJ3m3h1hI4",
  },
  {
    id: 61,
    title: "The Boss Baby: Family Business",
    description:
      "Grown-up Tim and Ted team up as babies again, battling a megalomaniac toddler with goofy gadgets and absurd family antics. Their pint-sized chaos delivers big laughs. DreamWorks’ 2021 animated sequel is a silly, baby-powered romp!",
    year: 2021,
    rating: 5.9,
    genre: "Animation, Comedy, Family",
    poster:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/the-boss-baby-family-business_ti2eeq9q_500x749.jpg?v=1672420728",
    trailerUrl: "https://www.youtube.com/embed/_W2VWL5jB3g",
  },
  {
    id: 62,
    title: "We Baby Bears",
    description:
      "Baby Grizz, Panda, and Ice Bear hop through magical worlds in a quirky box, stumbling into absurd adventures with goofy charm. Their cuddly chaos is pure fun. This 2022-2025 animated series is a whimsical delight!",
    year: 2022,
    rating: 6.6,
    genre: "Animation, Comedy, Adventure, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjlhN2QwZjUtYjFiYi00MjNmLWFlYWYtOTA5MmFjNjBmZTJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/6yI1J6YqS5Q",
  },
  {
    id: 63,
    title: "The Ice Age Adventures of Buck Wild",
    description:
      "Buck the weasel leads possum brothers Crash and Eddie on a zany prehistoric quest, dodging dinosaurs with goofy stunts and wild humor. Their chaotic antics are laugh-out-loud fun. This 2022 animated spin-off is a dino-sized riot!",
    year: 2022,
    rating: 4.3,
    genre: "Animation, Comedy, Adventure",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjhmNDg4NTQtOWNjYi00NjQ0LTgwNzItZDk5Nzk1ZmZlOWEyXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/wU2M5TWy2tQ",
  },
  {
    id: 64,
    title: "Only Murders in the Building",
    description:
      "Three quirky neighbors turn their true-crime obsession into a hilarious amateur detective romp, unraveling absurd building mysteries with goofy charm. Their oddball chemistry sparks big laughs. This 2021-2025 series is a comedic whodunit gem!",
    year: 2021,
    rating: 8.1,
    genre: "Comedy, Mystery, Series",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDFjZDg5MzItYmQxYS00ZmJkLWIwZGEtMjc0Y2QwYzRlNzg5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/embed/J_3hD5u3q8w",
  },
  {
    id: 65,
    title: "Chip 'n Dale: Rescue Rangers",
    description:
      "Chip and Dale, former cartoon stars, reunite for a zany meta-adventure to save a friend, navigating absurd toon-world chaos and goofy cameos. Their bumbling detective work is pure hilarity. This 2022 animated film is a nostalgic riot!",
    year: 2022,
    rating: 7,
    genre: "Animation, Comedy, Mystery",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDE4OGQ2ZGUtYWIwZC00MWU4LTgzYzktNGE3NDc4OTM1YWU2XkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/JvW1i5zF8kU",
  },
  {
    id: 66,
    title: "Resident Alien",
    description:
      "An alien posing as a small-town doctor fumbles through human life, sparking goofy misunderstandings and absurd sci-fi antics. His quirky attempts to blend in are laugh-out-loud fun. This 2021-2025 series is a cosmic comedy hit!",
    year: 2021,
    rating: 8.1,
    genre: "Comedy, Sci-Fi, Series",
    poster:
      "https://resizing.flixster.com/NL-3g0Yvia7b0zR6SdER9TUcDQY=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvN2M2YjdiYzItZmU0Mi00NjZiLWE4ODYtZDAxMDNiZDljOTY4LmpwZw==",
    trailerUrl: "https://www.youtube.com/embed/0g0D7JmnPVE",
  },
];

// ============================================================
// Movie Grid Component
// ============================================================
export default function MovieGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedMovie(filteredMovies[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredMovies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedMovie(filteredMovies[currentIndex + 1]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-black">
        <div className="text-center text-white/30">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-lg font-medium">No movies available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="w-full mt-10 min-h-screen bg-black py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-yellow-500 rounded-full" />
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                  Movie Library
                </h1>
                <p className="text-white/20 text-sm">
                  {filteredMovies.length} movies
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-yellow-500/50 focus:outline-none transition"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {search && filteredMovies.length === 0 && (
            <div className="text-white/20 text-sm mb-4">
              No results for "{search}"
            </div>
          )}

          {filteredMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/30">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg">No movies found</p>
              <p className="text-sm mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedMovie(movie);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="relative rounded-xl overflow-hidden bg-white/5">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/40 text-[10px] font-medium">
                      {movie.year}
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-amber-500 text-[8px] font-bold">
                      ★ {movie.rating}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </p>
                    <p className="text-white/20 text-xs truncate">
                      {movie.genre}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredMovies.length > 0 && (
            <div className="text-center mt-10 text-white/10 text-xs tracking-widest">
              {filteredMovies.length} movies • Click on any movie for details
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          Movie Detail Modal - Ultra Cinema Edition
          ============================================================ */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-black/98 to-black/99 border border-white/10 rounded-3xl shadow-2xl shadow-yellow-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ============================================================
                  Background with Blurred Poster
                  ============================================================ */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl blur-3xl opacity-20"
                style={{
                  backgroundImage: `url(${selectedMovie.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* ============================================================
                  Cinema Bars
                  ============================================================ */}
              <div className="absolute top-0 left-0 w-full h-[3px] z-20 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[3px] z-20 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-yellow-500/60 via-white/30 to-yellow-500/60" />
              </div>

              {/* ============================================================
                  Navigation Arrows
                  ============================================================ */}
              {filteredMovies.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
                    disabled={currentIndex === 0}
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center ${currentIndex === filteredMovies.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
                    disabled={currentIndex === filteredMovies.length - 1}
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}

              {/* ============================================================
                  Close Button
                  ============================================================ */}
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110"
              >
                <FaTimes size={20} />
              </button>

              {/* ============================================================
                  Action Buttons - Top Right
                  ============================================================ */}
              <div className="absolute top-4 right-20 z-30 flex items-center gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 flex items-center justify-center"
                >
                  <FaHeart className={isLiked ? "text-red-500 fill-red-500" : ""} size={18} />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 flex items-center justify-center"
                >
                  <FaBookmark className={isBookmarked ? "text-yellow-500 fill-yellow-500" : ""} size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 flex items-center justify-center">
                  <FaShare size={18} />
                </button>
              </div>

              {/* ============================================================
                  Counter
                  ============================================================ */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 text-white/20 text-xs tracking-widest hidden md:block">
                <span className="text-white/40 font-bold text-sm">{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="text-white/10"> / {String(filteredMovies.length).padStart(2, "0")}</span>
              </div>

              {/* ============================================================
                  Content
                  ============================================================ */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 p-6 md:p-10 lg:p-14">
                
                {/* Poster Section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full lg:w-[300px] xl:w-[350px] flex-shrink-0"
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 via-purple-500/30 to-yellow-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/30 border border-white/10">
                      <img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        className="w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Play Button on Poster */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(selectedMovie.trailerUrl, "_blank")}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <div className="w-20 h-20 rounded-full bg-yellow-500/95 backdrop-blur flex items-center justify-center shadow-2xl shadow-yellow-500/60 hover:shadow-yellow-500/80 transition-shadow">
                          <FaPlay className="text-black text-3xl ml-1" />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Info Section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center lg:text-left"
                >
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
                    style={{ textShadow: "0 4px 60px rgba(0,0,0,0.8)" }}
                  >
                    {selectedMovie.title}
                  </motion.h2>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium flex items-center gap-1.5">
                      <FaFilm size={10} />
                      {selectedMovie.genre}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/50 text-xs font-medium flex items-center gap-1.5">
                      <FaCalendar size={10} />
                      {selectedMovie.year}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1.5">
                      <FaStar size={10} />
                      {selectedMovie.rating} / 10
                    </span>
                    {selectedMovie.duration && (
                      <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/50 text-xs font-medium flex items-center gap-1.5">
                        <FaClock size={10} />
                        {selectedMovie.duration}
                      </span>
                    )}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/50 text-sm md:text-base leading-relaxed mt-6 max-w-2xl mx-auto lg:mx-0"
                  >
                    {selectedMovie.description}
                  </motion.p>

                  {/* Cast */}
                  {selectedMovie.cast && selectedMovie.cast.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-5"
                    >
                      <p className="text-white/20 text-xs uppercase tracking-wider mb-2">Cast</p>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        {selectedMovie.cast.slice(0, 6).map((actor, i) => (
                          <span key={i} className="text-white/40 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            {actor}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedMovie.trailerUrl, "_blank")}
                      className="group px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2"
                    >
                      <FaPlay size={14} />
                      Watch Trailer
                      <span className="text-black/40 group-hover:text-black/60 transition-colors">→</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/70 font-medium text-sm hover:bg-white/15 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <FaImdb size={16} />
                      View on IMDB
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>

              {/* ============================================================
                  Progress Dots
                  ============================================================ */}
              {filteredMovies.length > 1 && (
                <div className="relative z-10 flex justify-center items-center gap-2 pb-6">
                  {filteredMovies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setSelectedMovie(filteredMovies[index]);
                      }}
                      className={`
                        transition-all duration-500 rounded-full
                        ${currentIndex === index 
                          ? "w-8 h-1.5 bg-yellow-500 shadow-lg shadow-yellow-500/50" 
                          : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                        }
                      `}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}