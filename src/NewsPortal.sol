// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewsPlatform {
    struct Article {
        string title;
        string body;
        string[] tags;
        address author;
    }

    struct Comment {
        string evidence;
        string referenceURL;
        string evidenceType;
        string source;
        address commenter;
    }

    mapping(uint => Comment[]) public articleComments;
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

    function addComment(
        uint _articleId,
        string memory _evidence,
        string memory _referenceURL,
        string memory _evidenceType,
        string memory _source
    ) public {
        require(_articleId < articles.length, "Invalid article ID");
        Comment memory newComment = Comment({
            evidence: _evidence,
            referenceURL: _referenceURL,
            evidenceType: _evidenceType,
            source: _source,
            commenter: msg.sender
        });
        articleComments[_articleId].push(newComment);
    }

    function getComments(uint _articleId) public view returns (Comment[] memory) {
        require(_articleId < articles.length, "Invalid article ID");
        return articleComments[_articleId];
    }
}
