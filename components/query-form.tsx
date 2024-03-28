'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const QueryForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [origin, setOrigin] = useState<string>(searchParams.get('origin') || '');
  const [formFactor, setFormFactor] = useState<string>(searchParams.get('formFactor') || '');

  const handleChange = e => {
    const { value, id } = e.target;

    switch (id) {
      case 'origin':
        setOrigin(value);
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
