import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

const MessageComponent = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className="bg-purple-50 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold flex-shrink-0">
            U
          </div>
          <div className="flex-1">
            <p className="text-gray-800">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          P
        </div>
        <div className="flex-1">
          <div className="prose max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          
          {message.sources && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Sources</h4>
              <div className="space-y-2">
                {message.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
                  >
                    <ExternalLink size={14} />
                    <span className="truncate">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-4 text-gray-500">
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={copyToClipboard}
            >
              <Copy size={16} />
              {copied && <span className="text-xs ml-1">Copied!</span>}
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ThumbsUp size={16} />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ThumbsDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;