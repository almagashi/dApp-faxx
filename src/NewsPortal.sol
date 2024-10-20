// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewsPlatform {
    struct Article {
        string title;
        string body;
        string[] tags;
        address author;
    }

    Article[] public articles;

    function publishArticle(string memory _title, string memory _body, string[] memory _tags) public {
        articles.push(Article({
            title: _title,
            body: _body,
            tags: _tags,
            author: msg.sender
        }));
    }

    function getArticles() public view returns (Article[] memory) {
        return articles;
    }
}
