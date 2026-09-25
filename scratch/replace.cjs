const fs = require('fs');
const path = require('path');

const mappings = {
  bedOnlyImg: "est-bed-only",
  bedSideTableImg: "est-bed-with-side-table",
  bedWardrobeImg: "est-bed-with-wardrobe",
  completeBedroomImg: "est-bed-complete-room",
  queenSizeImg: "est-bed-queen-size",
  kingSizeImg: "est-bed-king-size",
  storageBedImg: "est-bed-storage",
  simpleWoodenImg: "est-bed-simple-wooden",
  upholsteredImg: "est-bed-upholstered",
  fullWallPanelingImg: "est-wall-full-paneling",
  hingedWardrobeImg: "est-wd-hinged",
  slidingWardrobeImg: "est-wd-sliding",
  walkInImg: "est-wd-walk-in",
  builtInImg: "est-wd-built-in-niche",
  matteImg: "est-fin-matte-laminate",
  acrylicImg: "est-fin-glossy-acrylic",
  plywoodImg: "est-mat-plywood",
  hdhmrImg: "est-mat-hdhmr",
  laminateImg: "est-fin-laminate",
  veneerImg: "est-fin-veneer",
  puImg: "est-fin-pu",
  hangingFocusImg: "est-wd-hanging-focus",
  shelvingFocusImg: "est-wd-shelving-focus",
  balancedImg: "est-wd-balanced-combo",
  drawerHeavyImg: "est-wd-drawer-heavy",
  pullDownImg: "est-wd-pulldown-hanger",
  jewelleryImg: "est-wd-jewellery-drawer",
  lightingImg: "est-add-internal-light",
  mirrorImg: "est-wd-mirror",
  softCloseImg: "est-hw-self-close",
  trouserRackImg: "est-wd-trouser-rack",
  workstationImg: "est-off-workstation",
  managerCabinImg: "est-off-manager-cabin",
  meetingRoomImg: "est-off-meeting-room",
  completeOfficeImg: "est-off-complete",
  hdhmrLaminateImg: "est-mat-hdhmr-laminate",
  plywoodVeneerImg: "est-mat-plywood-veneer",
  tvBaseImg: "est-tv-base-only",
  tvFullImg: "est-tv-full-wall",
  storageImg: "est-liv-display-storage",
  panelingImg: "est-wall-paneling",
  baseStorageImg: "est-tv-base-cabinet",
  wallStorageImg: "est-tv-wall-cabinet",
  openShelvesImg: "est-tv-open-shelves",
  drawersImg: "est-tv-drawers",
  flutedPanelImg: "est-wall-fluted-panel",
  backlightingImg: "est-add-backlighting",
  cableManagementImg: "est-off-cable-mgmt",
  handlelessImg: "est-hw-handleless-push",
  layoutStraight: "est-kit-single-wall",
  layoutLShape: "est-kit-l-shaped",
  layoutParallel: "est-kit-galley",
  layoutUShape: "est-kit-u-shaped",
  layoutIsland: "est-kit-island",
  layoutPeninsula: "est-kit-peninsula",
  completeKitchenImg: "est-kit-complete",
  baseCabinetImg: "est-kit-base-cabinet",
  wallCabinetImg: "est-kit-upper-cabinet",
  tallCabinetImg: "est-kit-tall-cabinet",
  hingedImg: "est-wd-hinged",
  slidingImg: "est-wd-sliding",
  bedProjectImg: "gal-bedroom-01",
  wardrobeImg: "gal-wardrobe-01",
  showroomImg: "gal-showroom-01",
  wardrobe1: "gal-wardrobe-01",
  livingImg: "gal-living-room-01",
  lobbyImg: "gal-lobby-01",
  upperCabinetImg: "est-kit-upper-cabinet",
  livingRoomImg: "est-room-living",
  kitchenImg: "est-room-kitchen",
  masterBedroomImg: "est-room-master-bedroom",
  bedroom2Img: "est-room-bedroom-2",
  bedroom3Img: "est-room-bedroom-3",
  diningImg: "est-room-dining",
  studyImg: "est-room-study-office",
  oneBhkImg: "est-prop-1bhk",
  twoBhkImg: "est-prop-2bhk",
  threeBhkImg: "est-prop-3bhk",
  fourBhkImg: "est-prop-4bhk",
  villaImg: "est-prop-villa",
  essentialImg: "est-pkg-essential",
  premiumImg: "est-pkg-premium",
  smartLuxuryImg: "est-pkg-smart-luxury",
  luxuryImg: "est-pkg-luxury",
  falseCeilingImg: "est-add-false-ceiling",
  decorativeLightImg: "est-add-decorative-light",
  paintingImg: "est-add-wall-paint-texture",
  curtainsImg: "est-add-curtains",
  sofasImg: "est-liv-sofas-beds"
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Add import if needed
  if (!content.includes("import { getImgUrl } from") && Object.keys(mappings).some(key => content.includes(key))) {
    // figure out how many levels to go up
    const levels = filePath.split('steps')[1].split(path.sep).length - 1;
    let up = '../';
    for (let i = 0; i < levels; i++) {
        up += '../';
    }
    const importStr = `import { getImgUrl } from '${up}utils/cloudinary';\n`;
    
    // insert after last import
    const lines = content.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIdx = i;
      }
    }
    if (lastImportIdx !== -1) {
      lines.splice(lastImportIdx + 1, 0, importStr);
      content = lines.join('\n');
      changed = true;
    }
  }

  for (const [varName, cloudId] of Object.entries(mappings)) {
    // Remove import statement for the variable
    const importRegex = new RegExp(`import\\s+${varName}\\s+from\\s+['"][^'"]+['"];?\\n?`, 'g');
    if (importRegex.test(content)) {
      content = content.replace(importRegex, '');
      changed = true;
    }

    // Replace usage in imageSrc={varName} or similar
    // could be image={varName} or imageSrc={varName} or src={varName}
    const usageRegex = new RegExp(`\\{${varName}\\}`, 'g');
    if (usageRegex.test(content)) {
      content = content.replace(usageRegex, `{getImgUrl("${cloudId}")}`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

processDirectory(path.join(__dirname, '../src/components/estimator/steps'));
