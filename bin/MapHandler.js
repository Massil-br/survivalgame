let map = null;
let noiseScale = 1/50;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let tileSize = 50; // Ajustez cette valeur selon la taille souhaitée pour les tuiles de la carte

function makeMap()
{

  map = [];
  for(let i = 0; i < 500; i++)
  {
    map[i] = [];
    for(let j = 0 ; j < 500; j++)
    {
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
    c = ocean;
  } 
  else if(h < 0.3)
  {
    if(random() > pow(h-0.2, 2)*100)
    {
      c = ocean;
    }
    else
    {
      c = shore;
    }
  }
  else if(h < 0.4)
  {
    if(random() > pow(h-0.3, 2)*100)
    {
      c = shore;
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
    let endXIndex = Math.min(mapWidth / tileSize, startXIndex + Math.ceil(w / tileSize));
    let endYIndex = Math.min(mapHeight / tileSize, startYIndex + Math.ceil(h / tileSize));

    for (let i = startXIndex; i < endXIndex; i++) {
        for (let j = startYIndex; j < endYIndex; j++) {
            fill(map[i][j]); // Assurez-vous que map[i][j] est une couleur valide
            rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}





