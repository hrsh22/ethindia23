// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract Armour is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    string baseSoulURI = "";
    uint256 public count = 0;

    constructor(
        address initialOwner
    ) ERC721("Armour", "Armour") Ownable(initialOwner) {}

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseSoulURI = _baseURI;
    }

    function safeMint(address to, string memory soulID) public {
        count = count + 1;
        _safeMint(to, count);
        _setTokenURI(
            count,
            string(abi.encodePacked(baseSoulURI, soulID, ".json"))
        );
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
