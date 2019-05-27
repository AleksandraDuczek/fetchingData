# fetchingData

Pobieranie danych ze strony https://www.reddit.com/r/funny.json.
Przedstawienie ich w ładnej, czytelnej dla użytkownika formie - w tabeli. 
Dokonywanie na nich operacji:
* sortowania po "titles", "upvotes", "downvotes", "score" lub dacie "created" w zależności od pola, na które użytkownik kliknie, 
* zwracania tytuł postu z najwyższym stosunkiem głosów dodatnich i ujemnych 
- w przypadku 0 głosów ujemnych, jedynie głosy dodatnie się liczą,
* wyświetlenie wszystkich postów z ostatniego dnia. 

