import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from "ethers";
import NewsPlatformABI from "./NewsPlatformABI.json";


const AddFaxx = ({ articleId, onSubmit }) => {
  const [evidence, setEvidence] = useState("");
  const [referenceURL, setReferenceURL] = useState("");
  const [evidenceType, setEvidenceType] = useState("supports");
  const [faxxSource, setFaxxSource] = useState("media outlet");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (articleId === undefined || articleId === null) {
      alert("article id is missing. please ensure you're submitting faxx for a valid article.");
      return;
    }
    const faxx = {
      articleId,
      evidence,
      referenceURL,
      evidenceType,
      faxxSource
    };
    await submitFaxx(faxx);
    onSubmit();
  };


const contractAddress = "0xC2D03F42240b1F99914d4e2131Ca214f969cFB3c";

const submitFaxx = async (faxx) => {
  if (!window.ethereum) {
    alert("please install metamask to interact with this feature.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NewsPlatformABI, signer);

    // Ensure all parameters are properly formatted
    const formattedArticleId = ethers.BigNumber.from(faxx.articleId.toString());
    const formattedEvidence = faxx.evidence || "";
    const formattedReferenceURL = faxx.referenceURL || "";
    const formattedEvidenceType = faxx.evidenceType || "";
    const formattedFaxxSource = faxx.faxxSource || "";

    console.log("Submitting faxx with:", {
      articleId: formattedArticleId.toString(),
      evidence: formattedEvidence,
      referenceURL: formattedReferenceURL,
      evidenceType: formattedEvidenceType,
      faxxSource: formattedFaxxSource
    });

    // Publish faxx linked to the article
    const tx = await contract.addComment(
      formattedArticleId,
      formattedEvidence,
      formattedReferenceURL,
      formattedEvidenceType,
      formattedFaxxSource
    );
    await tx.wait();
    alert("faxx successfully submitted!");
  } catch (err) {
    console.error("error submitting faxx:", err);
    alert("failed to submit faxx. error: " + err.message);
  }
};



  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-lg border border-gray-800">
      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-300 mb-2">add your faxx here.</label>
        <textarea
          id="evidence"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="enter your chain-of-thought here..."
          className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 resize-y min-h-[150px] border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="reference (url)"
          value={referenceURL}
          onChange={(e) => setReferenceURL(e.target.value)}
          className="flex-grow p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        />
      </div>
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">how does your faxx relate to the claim?</p>
        <select
          value={evidenceType}
          onChange={(e) => setEvidenceType(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        >
          <option value="supports">supports the claim</option>
          <option value="challenges">challenges the claim </option>
          <option value="rejects">rejects the claim </option>
          <option value="context">provides additional context</option>
        </select>
      </div>
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">where does this faxx come from?</p>
        <select
          value={faxxSource}
          onChange={(e) => setFaxxSource(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        >
          <option value="">select a source</option>
          <option value="media_outlet">media outlet</option>
          <option value="scientific_journal">scientific journal</option>
          <option value="social_media">social media</option>
          <option value="subject_matter_expert">subject matter expert</option>
          <option value="official_document">official document</option>
          <option value="first_hand_experience">first-hand experience</option>
          <option value="book">book</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-md shadow-lg transition duration-300 ease-in-out hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transform hover:scale-105"
      >
        faxx-check it
      </button>
    </form>
  );
}

export default AddFaxx;
