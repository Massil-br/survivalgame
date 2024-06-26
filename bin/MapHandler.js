let map = null;
let noiseScale = 1/50;
let volcano= "#f25500";
let volcanoStone = "#6e1d1b";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let tileSize = 50; // Ajustez cette valeur selon la taille souhaitée pour les tuiles de la carte
let mapWidth = 500*tileSize;
let mapHeight = 500*tileSize;

function makeMap()
{
    let numTilesWide = mapWidth / tileSize;
    let numTilesHigh = mapHeight / tileSize;

    map = [];
    for (let i = 0; i < numTilesWide; i++) {
        map[i] = [];
        for (let j = 0; j < numTilesHigh; j++) {
            map[i][j] = pickColor(i, j);
        }
    }
}

function pickColor(i, j)
{
  let h = noise((i)*noiseScale,
               (j)*noiseScale);
  let c = "#facade";
  
  if(h < 0.2)
  {
    c = volcano;
  } 
  else if(h < 0.3)
  {
    if(random() > pow(h-0.2, 2)*100)
    {
      c = volcano;
    }
    else
    {
      c = volcanoStone;
    }
  }
  else if(h < 0.4)
  {
    if(random() > pow(h-0.3, 2)*100)
    {
      c = volcanoStone;
    }
    else
    {
      c = sand;
    }
  }
  else if(h < 0.5)
  {
    if(random() > pow(h-0.4, 2)*100)
    {
      c = sand;
    }
    else
    {
      c = grass;
    }
  }
  else if(h < 0.6)
  {
    if(random() > pow(h-0.5, 2)*100)
    {
      c = grass;
    }
    else
    {
      c = stone;
    }
  }
  else if (h < 0.7)
  {
    if(random() > pow(h-0.6, 2)*100)
    {
      c = stone;
    }
    else
    {
      c = snow;
    }
  }
  else
  {
    c = snow;
  }
  
  return color(c);
}

function drawMap(startX, startY, w, h) {
    let startXIndex = Math.max(0, Math.floor(startX / tileSize));
    let startYIndex = Math.max(0, Math.floor(startY / tileSize));
    let endXIndex = Math.min(mapWidth / tileSize, startXIndex + Math.ceil(1+w / tileSize));
    let endYIndex = Math.min(mapHeight / tileSize, startYIndex + Math.ceil(1+h / tileSize));

    for (let i = startXIndex; i < endXIndex; i++) {
        for (let j = startYIndex; j < endYIndex; j++) {
            fill(map[i][j]);
            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}
