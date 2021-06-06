## ENS SDK

源代码构建 example:

```
  esbuild index.js --bundle --outfile=bundle.js --watch
```



pns.ensContract

    function setRecord(bytes32 node, address owner, address resolver, uint64 ttl) external virtual;

    function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl) external virtual;

    function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external virtual returns(bytes32);

    function setResolver(bytes32 node, address resolver) external virtual;

    function setOwner(bytes32 node, address owner) external virtual;

    function setTTL(bytes32 node, uint64 ttl) external virtual;

    function setApprovalForAll(address operator, bool approved) external virtual;

    function owner(bytes32 node) external virtual view returns (address);

    function resolver(bytes32 node) external virtual view returns (address);

    function ttl(bytes32 node) external virtual view returns (uint64);

    function recordExists(bytes32 node) external virtual view returns (bool);

    function isApprovedForAll(address owner, address operator) external virtual view returns (bool);

pns.resolverContract

    event AddrChanged(bytes32 indexed node, address a);
    event AddressChanged(bytes32 indexed node, uint coinType, bytes newAddress);
    event NameChanged(bytes32 indexed node, string name);
    event ABIChanged(bytes32 indexed node, uint256 indexed contentType);
    event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);
    event TextChanged(bytes32 indexed node, string indexed indexedKey, string key);
    event ContenthashChanged(bytes32 indexed node, bytes hash);
    /* Deprecated events */
    event ContentChanged(bytes32 indexed node, bytes32 hash);

    function ABI(bytes32 node, uint256 contentTypes) external view returns (uint256, bytes memory);

    function addr(bytes32 node) external view returns (address);

    function addr(bytes32 node, uint coinType) external view returns(bytes memory);

    function contenthash(bytes32 node) external view returns (bytes memory);

    function dnsrr(bytes32 node) external view returns (bytes memory);

    function name(bytes32 node) external view returns (string memory);

    function pubkey(bytes32 node) external view returns (bytes32 x, bytes32 y);

    function text(bytes32 node, string calldata key) external view returns (string memory);

    function interfaceImplementer(bytes32 node, bytes4 interfaceID) external view returns (address);

    function setABI(bytes32 node, uint256 contentType, bytes calldata data) external;

    function setAddr(bytes32 node, address addr) external;

    function setAddr(bytes32 node, uint coinType, bytes calldata a) external;

    function setContenthash(bytes32 node, bytes calldata hash) external;

    function setDnsrr(bytes32 node, bytes calldata data) external;

    function setName(bytes32 node, string calldata _name) external;

    function setPubkey(bytes32 node, bytes32 x, bytes32 y) external;

    function setText(bytes32 node, string calldata key, string calldata value) external;

    function setInterface(bytes32 node, bytes4 interfaceID, address implementer) external;

    function supportsInterface(bytes4 interfaceID) external pure returns (bool);

    function multicall(bytes[] calldata data) external returns(bytes[] memory results);

pns.registrarContract

    // A map of addresses that are authorised to register and renew names.
    mapping(address=>bool) public controllers;

    // Authorises a controller, who can register and renew domains.
    function addController(address controller) virtual external;

    // Revoke controller permission for an address.
    function removeController(address controller) virtual external;

    // Set the resolver for the TLD this registrar manages.
    function setResolver(address resolver) virtual external;

    // Returns the expiration timestamp of the specified label hash.
    function nameExpires(uint256 id) virtual external view returns(uint);

    // Returns true iff the specified name is available for registration.
    function available(uint256 id) virtual public view returns(bool);

    // Register a name.
    function register(uint256 id, address owner, uint duration) virtual external returns(uint);

    function renew(uint256 id, uint duration) virtual external returns(uint);

    // Reclaim ownership of a name in ENS, if you own it in the registrar.
    function reclaim(uint256 id, address owner) virtual external;

pns.controllerContract


    mapping(bytes32=>uint) public commitments;

    event NameRegistered(string name, bytes32 indexed label, address indexed owner, uint cost, uint expires);
    event NameRenewed(string name, bytes32 indexed label, uint cost, uint expires);
    event NewPriceOracle(address indexed oracle);

    function rentPrice(string memory name, uint duration) view public returns(uint)

    function valid(string memory name) public pure returns(bool)

    function available(string memory name) public view returns(bool)

    function makeCommitment(string memory name, address owner, bytes32 secret) pure public returns(bytes32)

    function makeCommitmentWithConfig(string memory name, address owner, bytes32 secret, address resolver, address addr) pure public returns(bytes32)

    function commit(bytes32 commitment) public

    function register(string calldata name, address owner, uint duration, bytes32 secret) external payable

    function registerWithConfig(string memory name, address owner, uint duration, bytes32 secret, address resolver, address addr) public payable

    function renew(string calldata name, uint duration) external payable

    function setPriceOracle(PriceOracle _prices) public onlyOwner

    function setCommitmentAges(uint _minCommitmentAge, uint _maxCommitmentAge) public onlyOwner

    function withdraw() public onlyOwner

    function supportsInterface(bytes4 interfaceID) external pure returns (bool)

    function _consumeCommitment(string memory name, uint duration, bytes32 commitment) internal returns (uint256)

pns.bulkRenewalContract

    function getController() internal view returns(ETHRegistrarController)

    function rentPrice(string[] calldata names, uint duration) external view returns(uint total)

    function renewAll(string[] calldata names, uint duration) external payable

    function supportsInterface(bytes4 interfaceID) external pure returns (bool)



