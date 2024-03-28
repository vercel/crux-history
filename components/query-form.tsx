'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const QueryForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [origin, setOrigin] = useState<string>(searchParams.get('origin') || '');
  const [formFactor, setFormFactor] = useState<string>(searchParams.get('formFactor') || '');
  const [error, setError] = useState<string | null>(null);

  const handleChange = e => {
    const { value, id } = e.target;

    switch (id) {
      case 'origin':
        setOrigin(value);
        if(value.length >= 4 && !value.startsWith("http")){
          setError(`${value} needs to start with https protocol!`);
        }
        break;
      case 'formFactor':
        setFormFactor(value);
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
        <label htmlFor="origin">Origin (must include protocol)</label>
        <input
          type="text"
          name="origin"
          id="origin"
          placeholder="URL of site to analyze"
          required
          value={origin}
          onChange={handleChange}
          className="text-black"
        />
        {error && <div className="my-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>}
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
        disabled={error !== null}
      >
        Submit
      </button>
    </form>
  );
};

export default QueryForm;
