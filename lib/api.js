async function fetcher(url) {
  const json = await fetch(url).then((res) => res.json());

  return json;
}

function toSlug(name) {
  return name
    .replace(/([A-Z])([a-z])/g, " $1$2")
    .trim()
    .replace(/3 D/g, " 3D ")
    .trim()
    .replace(/\'|\(|\)|\!|\?|\:/g, "")
    .replace(/\s+|\&|\.|\s-\s/g, "-")
    .replace(/\-+/g, "-")
    .toLowerCase();
}

function formatData(data) {
  let fullData = [],
    basicData = [],
    categoryData = [],
    categories = [];

  data.sort((a, b) => (a.lastUpdate < b.lastUpdate ? 1 : -1));

  data.map((game) => {
    let basicItem = {};
    let fullItem = {};
    (basicItem.id = game.id),
      (basicItem.title = game.title.trim()),
      (basicItem.slug = toSlug(game.title)),
      (basicItem.category = game.category),
      (basicItem.lastUpdate = game.lastUpdate),
      (basicItem.thumbnailUrl100 = game.thumbnailUrl100),
      (basicItem.url = game.url),
      (basicItem.rkScore = (game.rkScore * 5).toFixed(1));

    basicData.push(basicItem);

    fullItem = Object.assign({}, basicItem);

    (fullItem.description = game.description),
      (fullItem.thumbnailUrl = game.thumbnailUrl),
      fullData.push(fullItem);

    categoryData.push(game.category);
  });

  categoryData = [...new Set(categoryData)];

  categoryData.map((category) => {
    let item = {};
    (item.name = category), (item.slug = category.toLowerCase());
    categories.push(item);
  });
  categories.sort((a, b) => (a.name > b.name ? 1 : -1));

  basicData.map((game) => {
    let id = game.id;
    let slug = game.slug;
    basicData
      .filter((game) => game.id !== id)
      .find((game) =>
        game.slug == slug ? (game.slug = `${slug}-${game.id}`) : null
      );
    fullData
      .filter((game) => game.id !== id)
      .find((game) =>
        game.slug == slug ? (game.slug = `${slug}-${game.id}`) : null
      );
  });

  return { fullData, basicData, categories };
}

export const GetGames = async (url, type) => {
  let originalData = await fetcher(url).then((res) => res.data);

  // const games = useMemo(() => formatData(originalData), [originalData]);
  const games = formatData(originalData);

  switch (type) {
    case `full`:
      return games.fullData;
    case `category`:
      return games.categories;
    default:
      return games.basicData;
  }
};
