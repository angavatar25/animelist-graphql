import { useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { AnimeListContainer, MainTitle, SubTitle, TitleContainer } from "../style/AnimeList";
import useRequester from "../hooks/useRequester";
import { useNavigate } from "react-router-dom";

const animeData = {
  "Page": {
    "pageInfo": {
      "total": 5000,
      "perPage": 10
    },
    "media": [
      {
        "id": 21,
        "title": {
          "romaji": "ONE PIECE",
          "english": "ONE PIECE",
          "native": "ONE PIECE"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Adventure",
          "Comedy",
          "Drama",
          "Fantasy"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
        "description": "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.<br><br>\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.<br><br>\n<b>*This includes following special episodes:</b><br>\n- Chopperman to the Rescue! Protect the TV Station by the Shore! (Episode 336)<br>\n- The Strongest Tag-Team! Luffy and Toriko's Hard Struggle! (Episode 492)<br>\n- Team Formation! Save Chopper (Episode 542)<br>\n- History's Strongest Collaboration vs. Glutton of the Sea (Episode 590)<br>\n- 20th Anniversary! Special Romance Dawn (Episode 907)"
      },
      {
        "id": 11061,
        "title": {
          "romaji": "HUNTER×HUNTER (2011)",
          "english": "Hunter x Hunter (2011)",
          "native": "HUNTER×HUNTER (2011)"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Adventure",
          "Fantasy"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg",
        "description": "A new adaption of the manga of the same name by Togashi Yoshihiro.<br><br>\nA Hunter is one who travels the world doing all sorts of dangerous tasks. From capturing criminals to searching deep within uncharted lands for any lost treasures. Gon is a young boy whose father disappeared long ago, being a Hunter. He believes if he could also follow his father's path, he could one day reunite with him.<br><br>\nAfter becoming 12, Gon leaves his home and takes on the task of entering the Hunter exam, notorious for its low success rate and high probability of death to become an official Hunter. He befriends the revenge-driven Kurapika, the doctor-to-be Leorio and the rebellious ex-assassin Killua in the exam, with their friendship prevailing throughout the many trials and threats they come upon taking on the dangerous career of a Hunter."
      },
      {
        "id": 16498,
        "title": {
          "romaji": "Shingeki no Kyojin",
          "english": "Attack on Titan",
          "native": "進撃の巨人"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Drama",
          "Fantasy",
          "Mystery"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
        "description": "Several hundred years ago, humans were nearly exterminated by titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest of titans.<br><br>\r\nFlash forward to the present and the city has not seen a titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a colossal titan that appears out of thin air. As the smaller titans flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single titan and take revenge for all of mankind.<br><br>\r\n(Source: MangaHelpers) "
      },
      {
        "id": 5114,
        "title": {
          "romaji": "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST",
          "english": "Fullmetal Alchemist: Brotherhood",
          "native": "鋼の錬金術師 FULLMETAL ALCHEMIST"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Adventure",
          "Drama",
          "Fantasy"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
        "description": "\"In order for something to be obtained, something of equal value must be lost.\"\n<br><br>\nAlchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called \"automail\" and become a state alchemist, the Fullmetal Alchemist.\n<br><br>\nThree years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.\n<br><br>\n(Source: MAL Rewrite)"
      },
      {
        "id": 113415,
        "title": {
          "romaji": "Jujutsu Kaisen",
          "english": "JUJUTSU KAISEN",
          "native": "呪術廻戦"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Drama",
          "Supernatural"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
        "description": "A boy fights... for \"the right death.\"<br>\n<br>\nHardship, regret, shame: the negative feelings that humans feel become Curses that lurk in our everyday lives. The Curses run rampant throughout the world, capable of leading people to terrible misfortune and even death. What's more, the Curses can only be exorcised by another Curse.<br>\n<br>\nItadori Yuji is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a friend who has been attacked by Curses, he eats the finger of the Double-Faced Specter, taking the Curse into his own soul. From then on, he shares one body with the Double-Faced Specter. Guided by the most powerful of sorcerers, Gojou Satoru, Itadori is admitted to the Tokyo Metropolitan Technical High School of Sorcery, an organization that fights the Curses... and thus begins the heroic tale of a boy who became a Curse to exorcise a Curse, a life from which he could never turn back.\n<br><br>\n(Source: Crunchyroll)<br>\n<br>\n<i>Note: The first episode received an early web premiere on September 19th, 2020. The regular TV broadcast started on October 3rd, 2020.</i>"
      },
      {
        "id": 101922,
        "title": {
          "romaji": "Kimetsu no Yaiba",
          "english": "Demon Slayer: Kimetsu no Yaiba",
          "native": "鬼滅の刃"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Adventure",
          "Drama",
          "Fantasy",
          "Supernatural"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
        "description": "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.<br>\n<br>\n(Source: Crunchyroll)"
      },
      {
        "id": 1535,
        "title": {
          "romaji": "DEATH NOTE",
          "english": "Death Note",
          "native": "DEATH NOTE"
        },
        "type": "ANIME",
        "genres": [
          "Mystery",
          "Psychological",
          "Supernatural",
          "Thriller"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
        "description": "Light Yagami is a genius high school student who is about to learn about life through a book of death. When a bored shinigami, a God of Death, named Ryuk drops a black notepad called a <i>Death Note</i>, Light receives power over life and death with the stroke of a pen. Determined to use this dark gift for the best, Light sets out to rid the world of evil… namely, the people he believes to be evil. Should anyone hold such power?<br>\n<br>\nThe consequences of Light’s actions will set the world ablaze.<br>\n<br>\n(Source: Viz Media)"
      },
      {
        "id": 20954,
        "title": {
          "romaji": "Koe no Katachi",
          "english": "A Silent Voice",
          "native": "聲の形"
        },
        "type": "ANIME",
        "genres": [
          "Drama",
          "Romance",
          "Slice of Life"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
        "description": "After transferring into a new school, a deaf girl, Shouko Nishimiya, is bullied by the popular Shouya Ishida. As Shouya continues to bully Shouko, the class turns its back on him. Shouko transfers and Shouya grows up as an outcast. Alone and depressed, the regretful Shouya finds Shouko to make amends.\n<br><br>\n(Source: Eleven Arts)"
      },
      {
        "id": 9253,
        "title": {
          "romaji": "Steins;Gate",
          "english": "Steins;Gate",
          "native": "シュタインズ・ゲート"
        },
        "type": "ANIME",
        "genres": [
          "Drama",
          "Psychological",
          "Sci-Fi",
          "Thriller"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
        "description": "Self-proclaimed mad scientist Okabe Rintarou lives in a small room in Akihabara, where he invents \"future gadgets\" with fellow lab members Shiina Mayuri, his air-headed childhood friend, and Hashida Itaru, an otaku hacker. The three pass the time by tinkering with their latest creation, a \"Phone Microwave\" that can be controlled through text messages. \n<br><br>\nThe lab members soon face a string of mysterious incidents that lead to a game-changing discovery: the Phone Microwave can send emails to the past and thus alter history. Adapted from the critically acclaimed visual novel by 5pb. and Nitroplus, Steins;Gate takes Okabe to the depths of scientific theory and human despair as he faces the dire consequences of changing the past."
      },
      {
        "id": 1735,
        "title": {
          "romaji": "NARUTO: Shippuuden",
          "english": "Naruto: Shippuden",
          "native": "NARUTO -ナルト- 疾風伝"
        },
        "type": "ANIME",
        "genres": [
          "Action",
          "Adventure",
          "Comedy",
          "Drama",
          "Fantasy",
          "Supernatural"
        ],
        "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1735.jpg",
        "description": "Naruto: Shippuuden is the continuation of the original animated TV series Naruto. The story revolves around an older and slightly more matured Uzumaki Naruto and his quest to save his friend Uchiha Sasuke from the grips of the snake-like Shinobi, Orochimaru. After 2 and a half years Naruto finally returns to his village of Konoha, and sets about putting his ambitions to work, though it will not be easy, as he has amassed a few (more dangerous) enemies, in the likes of the shinobi organization; Akatsuki. <br><br>\n(Source: Anime News Network)"
      }
    ]
  }
}

const AnimeList = () => {
  // const { fetchAnimeList } =useRequester();
  // useEffect(() => {
  //   fetchAnimeList();
  // }, [])
  const navigate = useNavigate();

  const navigateToAnimeDetail = (id: number) => {
    navigate({ pathname: '/anime-detail', search: `?id=${id}` });
  }
  return (
    <AnimeListContainer>
      <TitleContainer>
        <MainTitle>Discover</MainTitle>
        <SubTitle>Find your best pick anime</SubTitle>
      </TitleContainer>

      {animeData.Page.media.map((index) => (
        <AnimeCard
          onClick={() => navigateToAnimeDetail(index.id)}
          banner={index.bannerImage}
          title={index.title.english}
          genres={index.genres}
        />
      ))}
    </AnimeListContainer>
  )
};

export default AnimeList;