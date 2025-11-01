const model = {
  appState: {
    currentIndex: 0,   // peker på "neste" spørsmål som skal besvares
    answers: []        // answers[i] = 0 eller 1 (brukerens valg for spørsmål i)
  },
  traitDescriptions: {
    P: "Produsent",
    A: "Administrator",
    E: "Entreprenør",
    I: "Integrator"
  },
  questions: [
    {
      group: 2,
      answer: "E",
      text: "Hva vil jeg helst at andre skal legge merke til hos meg?",
      options: [
        {
          text: "Mine mange gode ideer (E)",
          trait: "E"
        },
        {
          text: "Min menneskelige varme (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "P",
      text: "Hva legger jeg mest vekt på i jobben min?",
      options: [
        {
          text: "Å få ting unna (P)",
          trait: "P"
        },
        {
          text: "Å få gjort ting systematisk og riktig (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "I",
      text: "Hva gir meg mest tilfredsstillelse?",
      options: [
        {
          text: "Å koordinere andres arbeid (I)",
          trait: "I"
        },
        {
          text: "Å selv være produktiv (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva frustrerer meg mest?",
      options: [
        {
          text: "At folk ikke gjør som jeg sier (P)",
          trait: "P"
        },
        {
          text: "At folk misforstår meg (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Min innstilling til endringer",
      options: [
        {
          text: "Jeg liker nye løsninger som gir raskere resultater (E)",
          trait: "E"
        },
        {
          text: "Alt må være godt gjennomtenkt og planlagt (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva kjennetegner meg mest",
      options: [
        {
          text: "At jeg er forståelsesfull (I)",
          trait: "I"
        },
        {
          text: "At jeg er entusiastisk (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hvilken aktivitet er jeg best til?",
      options: [
        {
          text: "Å følge gjeldende regler og retningslinjer (A)",
          trait: "A"
        },
        {
          text: "Å se helheten og ha oversikt (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hvordan vil jeg helst bli oppfattet av mine venner?",
      options: [
        {
          text: "En som har store ambisjoner (E)",
          trait: "E"
        },
        {
          text: "En som er sosial og høy status i organisasjonen (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva blir jeg rost for av mine kollegaer?",
      options: [
        {
          text: "At jeg kan omgås alle (I)",
          trait: "I"
        },
        {
          text: "At jeg har stor arbeidskapasitet (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hva misunner mine kollegaer meg mest for?",
      options: [
        {
          text: "Mine analytiske evner (A)",
          trait: "A"
        },
        {
          text: "Mine samarbeidsevner (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hvordan vil jeg helst at min familie skal oppfatte min rolle i organisasjonen?",
      options: [
        {
          text: "En som bidrar til nytenkning og innovasjon (E)",
          trait: "E"
        },
        {
          text: "En som jobber hardt for å skape resultater ut over det vanlige (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Min innstilling til konflikter",
      options: [
        {
          text: "Konflikter er bortkastet tid (P)",
          trait: "P"
        },
        {
          text: "Jeg er ofte sterkt uenig med andre og har ikke noe imot det (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hva bruker jeg mest tid på?",
      options: [
        {
          text: "Å finne smartere måter å jobbe på (E)",
          trait: "E"
        },
        {
          text: "Å få unna hastesakene (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "A",
      text: "Min holdning til forandringer",
      options: [
        {
          text: "Jeg er et vanemenneske som synes forandringer kan være smertefulle (A)",
          trait: "A"
        },
        {
          text: "Jeg er av natur nysgjerrig og liker forandringer (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva betyr mest for meg i jobben?",
      options: [
        {
          text: "At jeg kan jobbe hardt for å oppnå suksess (P)",
          trait: "P"
        },
        {
          text: "At jeg har en trygg og sikker arbeidsplass (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva er mine viktigste oppgaver?",
      options: [
        {
          text: "Å få frem det beste i folkene rundt meg (I)",
          trait: "I"
        },
        {
          text: "Å få tingene gjort til tiden (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hva vurderer jeg meg selv etter?",
      options: [
        {
          text: "Hvor flink jeg er til å få teamet til å etterleve lover, regler og prosedyrer (A)",
          trait: "A"
        },
        {
          text: "Hvor flink jeg er til å sette nye ting i gang (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hvordan foretrekker jeg å bruke min fritid når jeg er alene?",
      options: [
        {
          text: "Benytte muligheten til å planlegge og ha kontroll (A)",
          trait: "A"
        },
        {
          text: "Benytte muligheten til å få unna noe jobbrelatert (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "I",
      text: "Hva har jeg mest behov for å føle?",
      options: [
        {
          text: "At jeg er en del av et fellesskap (I)",
          trait: "I"
        },
        {
          text: "At mine idéer og forslag tas på alvor (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 2,
      answer: "A",
      text: "Hva tiltaler meg mest?",
      options: [
        {
          text: "Å rydde, og holde saker og ting i orden (A)",
          trait: "A"
        },
        {
          text: "Å være i aktivitet fra morgen til kveld (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "A",
      text: "Hva ville jeg helst roses for av mine kolleger?",
      options: [
        {
          text: "Mine analytiske evner (A)",
          trait: "A"
        },
        {
          text: "Mine mange initiativ (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva legger jeg mest vekt på i mine arbeidsbetingelser?",
      options: [
        {
          text: "At jeg kan arbeide i et team (I)",
          trait: "I"
        },
        {
          text: "At jeg kan arbeide selvstendig (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hvilket arbeid gir meg størst tilfredsstillelse?",
      options: [
        {
          text: "Å få problemene ut av verden i en fart (P)",
          trait: "P"
        },
        {
          text: "Å analysere og lage planer på kort og lang sikt (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hvordan vil jeg innerst inne helst se meg selv?",
      options: [
        {
          text: "En som tenker nytt og annerledes (E)",
          trait: "E"
        },
        {
          text: "En som er flink med folk (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hva legger andre helst merke til hos meg?",
      options: [
        {
          text: "At jeg er innovativ (E)",
          trait: "E"
        },
        {
          text: "At jeg er strukturert (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Når føler jeg meg best?",
      options: [
        {
          text: "Når jeg raser av gårde og får tingene gjort (P)",
          trait: "P"
        },
        {
          text: "Når jeg sitter rolig og analyserer en sak (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hvis jeg blir forfremmet, hva burde så en annen som fikk min stilling legge vekt på?",
      options: [
        {
          text: "Å være positiv, fremtidsorientert og kunne ta de muligheter som byr seg (E)",
          trait: "E"
        },
        {
          text: "Å få frem det beste i folk, og skape suksess sammen med andre (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Når føler jeg meg best?",
      options: [
        {
          text: "Når jeg utforsker nye ting (E)",
          trait: "E"
        },
        {
          text: "Når jeg kan være empatisk (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Min reaksjon på uenighet",
      options: [
        {
          text: "Uenighet irriterer meg ofte (P)",
          trait: "P"
        },
        {
          text: "Vi må bruke tid på å drøfte og diskutere uenigheter slik at alle føler seg sett og hørt (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva vil andre legge mest mulig merke til hos meg?",
      options: [
        {
          text: "Min imøtekommenhet (I)",
          trait: "I"
        },
        {
          text: "Min effektive travelhet (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva beklager jeg mest?",
      options: [
        {
          text: "At jeg har for mye å gjøre (P)",
          trait: "P"
        },
        {
          text: "At det legges for lite vekt på samarbeid (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Min innstilling til forandring",
      options: [
        {
          text: "Jeg er glad i forandringer som jeg selv innfører (E)",
          trait: "E"
        },
        {
          text: "Jeg liker godt forandringer som vi alle er enige i (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hvilket arbeid gir meg størst tilfredsstillelse?",
      options: [
        {
          text: "Å forfølge en ny, fantasifull ide (E)",
          trait: "E"
        },
        {
          text: "Når jeg lærer noe nytt om de menneskene jeg jobber sammen med (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva vil jeg at andre skal legge merke til hos meg?",
      options: [
        {
          text: "Min effektive travelhet (P)",
          trait: "P"
        },
        {
          text: "At jeg har kontroll på det jeg har ansvar for (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Min reaksjon på konflikter",
      options: [
        {
          text: "Større uenigheter og konflikter bør bekjempes (P)",
          trait: "P"
        },
        {
          text: "Uenigheter og konflikter kan føre til nye ideer og løsninger (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hva legger jeg mest vekt på i mine arbeidssituasjon?",
      options: [
        {
          text: "At jeg har mulighet for å gjøre ting annerledes og bedre (E)",
          trait: "E"
        },
        {
          text: "At jeg har en plan å gå etter (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hvordan vil jeg innerst inne helst se meg selv?",
      options: [
        {
          text: "Som den travle leder (P)",
          trait: "P"
        },
        {
          text: "Som den som sitter med totalansvaret (A)",
          trait: "A"
        }
      ]
    },
    {
      group: 2,
      answer: "A",
      text: "Hva har jeg mest behov for å føle?",
      options: [
        {
          text: "At jeg har kontroll (A)",
          trait: "A"
        },
        {
          text: "At jeg presterer på mitt beste (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "I",
      text: "Hva tiltaler meg mest?",
      options: [
        {
          text: "At jeg er hyggelig å lett å jobbe sammen med (I)",
          trait: "I"
        },
        {
          text: "At jeg bidrar til nye og innovative løsninger (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva ville jeg helst roses for av mine kolleger?",
      options: [
        {
          text: "Min effektivitet (P)",
          trait: "P"
        },
        {
          text: "Mine samarbeidsevner (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hvis du fikk en ekstra fridag, hva ville du helst brukt den til?",
      options: [
        {
          text: "Gjøre noe sammen med venner / familie (I)",
          trait: "I"
        },
        {
          text: "Utforske noe nytt og ukjent på egenhånd (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 2,
      answer: "I",
      text: "Hva betyr mest for meg i jobben?",
      options: [
        {
          text: "At jeg kan bidra til et godt teamarbeid (I)",
          trait: "I"
        },
        {
          text: "At jeg kan være kreativ og bidra med nytenkning (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hva er mine viktigste oppgaver?",
      options: [
        {
          text: "Å sørge for at alt blir riktig (A)",
          trait: "A"
        },
        {
          text: "Å hele tiden utforske nye og bedre måter å jobbe på (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "P",
      text: "Hva vurderer jeg meg selv etter?",
      options: [
        {
          text: "Hvor hardt jeg arbeider (P)",
          trait: "P"
        },
        {
          text: "Hvor godt jeg blir likt (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "A",
      text: "Hva bruker jeg mest tid på?",
      options: [
        {
          text: "Påse at ting blir gjort riktig (A)",
          trait: "A"
        },
        {
          text: "Bidra til et godt arbeidsmiljø (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "A",
      text: "Hvordan vil jeg at familien min oppfatter min rolle i organisasjonen",
      options: [
        {
          text: "Som en pliktoppfyllende, ansvarlig og strukturert person (A)",
          trait: "A"
        },
        {
          text: "Som en som skaper gode resultater i samspill med andre (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Min holdning til møter",
      options: [
        {
          text: "Ofte unødvendige da de tar tid som kunne bli brukt til noe mer produktivt (P)",
          trait: "P"
        },
        {
          text: "En fin mulighet til å bli kjent med hva folk tenker og mener (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hva misunner mine kolleger meg mest for?",
      options: [
        {
          text: "Min effektivitet (P)",
          trait: "P"
        },
        {
          text: "Min evne til å ta raske beslutninger (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "E",
      text: "Hva blir jeg mest rost for av mine kolleger?",
      options: [
        {
          text: "At jeg er nøyaktig, har kontroll og er systematisk (A)",
          trait: "A"
        },
        {
          text: "At jeg er modig, ser muligheter og tar kalkulert risiko (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hvilken aktivitet er jeg best til?",
      options: [
        {
          text: "Få unna det daglige arbeidet (P)",
          trait: "P"
        },
        {
          text: "Bygge relasjoner og skape stolthet i team (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hvordan vil jeg helst oppfattes av mine venner?",
      options: [
        {
          text: "Som den som har et trygt og velordnet liv (A)",
          trait: "A"
        },
        {
          text: "Som den som lever et spennende og morsomt liv (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "I",
      text: "Hva legger jeg mest vekt på i min jobb?",
      options: [
        {
          text: "Å sette i gang nye aktiviteter (E)",
          trait: "E"
        },
        {
          text: "At ingen er perfekt, men at et team kan bli det (I)",
          trait: "I"
        }
      ]
    },
    {
      group: 2,
      answer: "P",
      text: "Hva jeg legger mest vekt på når beslutninger skal fattes",
      options: [
        {
          text: "Å finne en løsning som alle kan akseptere (I)",
          trait: "I"
        },
        {
          text: "Å finne den løsningen som gir det beste resultatet raskest (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 1,
      answer: "P",
      text: "Hva utmerker jeg meg mest ved?",
      options: [
        {
          text: "Å holde orden i sakene mine (A)",
          trait: "A"
        },
        {
          text: "Å overholde tidsfristene mine (P)",
          trait: "P"
        }
      ]
    },
    {
      group: 2,
      answer: "E",
      text: "Hva gir meg mest tilfredsstillelse?",
      options: [
        {
          text: "Å utarbeide den riktige detaljerte plan (A)",
          trait: "A"
        },
        {
          text: "Å utforske muligheter og problemer fremover (E)",
          trait: "E"
        }
      ]
    },
    {
      group: 1,
      answer: "P",
      text: "Hvis jeg ble forfremmet, hva burde så en annen som fikk min stilling legge vekt på?",
      options: [
        {
          text: "Å være systematisk (A)",
          trait: "A"
        },
        {
          text: "Å få saker og ting unna (P)",
          trait: "P"
        }
      ]
    }
  ]
}