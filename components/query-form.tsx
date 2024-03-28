'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const QueryForm = () => {
  const searchParams = useSearchParams();

  // Indicates whether to make the request to an `origin` or a specific URL
  // See: https://developer.chrome.com/docs/crux/history-api#schema
  const [query, setQuery] = useState<string>(searchParams.get('query') || 'origin');

  const [url, setUrl] = useState<string>(searchParams.get('url') || '');
  const [formFactor, setFormFactor] = useState<string>(searchParams.get('formFactor') || '');

  const handleChange = e => {
    const { value, id } = e.target;

    switch (id) {
      case 'url':
        setUrl(value);
        break;
      case 'formFactor':
        setFormFactor(value);
      case 'origin-option':
        setQuery('origin');
      case 'page-option':
        setQuery('page');
      default:
        break;
    }
  };

  return (
    <form
      encType="application/x-www-form-urlencoded"
      className="w-1/2 space-y-4"
    >
      <div className="flex flex-col">
        <fieldset>
          <legend className="font-bold mb-1">Query type:</legend>
          <div className="space-x-4">
            <label htmlFor="origin-option">Full origin</label>
            <input
              type="radio"
              name="queryType"
              value="origin"
              id="origin-option"
              checked={query === 'origin'}
              onChange={() => setQuery('origin')}
            />
            <label className="page-option">Specific page</label>
            <input
              type="radio"
              name="queryType"
              value="page"
              id="page-option"
              checked={query === 'page'}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col">
        <label htmlFor="url">URL (must include protocol)</label>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="URL of site to analyze"
          required
          value={url}
          onChange={handleChange}
          className="text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="formFactor">Device type</label>
        <select
          name="formFactor"
          id="formFactor"
          value={formFactor}
          onChange={handleChange}
          className="text-black"
        >
          <option value={'DESKTOP'}>Desktop</option>
          <option value={'PHONE'}>Mobile</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-neutral-700 p-2 py-1 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default QueryForm;
