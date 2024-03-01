class ModPack {
    constructor(name, version, modLoader, id) {
        this.name = name;
        this.version = version;
        this.modLoader = modLoader;
        this.id = id;
    }

    getVersion() {
        return this.version;
    }
}



const modPacks = [
    new ModPack('The chocolate thief', '1.20.1', 'Quilt', 1),
    new ModPack('The chocolate thief', '1.16.5', 'Forge', 2),
    new ModPack('The chocolate thief', '1.7.10', 'Forge', 3)
];

module.exports = modPacks;