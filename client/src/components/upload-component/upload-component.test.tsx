import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import DragDrop, { getVorgang, upload, analyse, deleteStatus, updateStatus } from './upload-component';
import {describe, expect, test, } from '@jest/globals';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";


const mockRechnung = new File(["file contents"], "Rechnung123.pdf", { type: "application/pdf" });
const mockAuftrag = new File(["file contents"], "Auftrag123_pd.pdf", { type: "application/pdf" });
const mockPOD = new File(["file contents"], "POD_123s.pdf", { type: "application/pdf" });

describe('getVorgang function tests', () => {

  test('getVorgang returns corect Rechnung string', () => {
    expect(getVorgang(mockRechnung)).toBe('123')
  });
  test('getVorgang returns corect Auftrag string', () => {
    expect(getVorgang(mockAuftrag)).toBe('123_pd')
  });
  test('getVorgang returns corect POD string', () => {
    expect(getVorgang(mockPOD)).toBe('_123s')
  });
})


test("renders header", () => {
  render(<DragDrop />);
  expect(screen.getByTestId("header")).toHaveTextContent("Dokumente hochladen");
});

test("renders main text", () => {
  render(<DragDrop />);
  expect(screen.getByTestId("main-text")).toHaveTextContent("Dokumente hinein ziehen");
});



describe('upload function', () => {

  beforeEach(() => {
    fetch.resetMocks(); // Reset mocks before each test
  });

  it('uploads file successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 });
    await expect(upload(mockRechnung)).resolves.not.toThrow();
  });

  it('handles server error during file upload', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error', message: 'Upload failed' }), { status: 500 });
    await expect(upload(mockRechnung)).rejects.toThrow('Upload failed');
  });

  it('rejects invalid file format during upload', async () => {
    const mockRechnungInvalid = new File(["file contents"], "Rechnu123.txt", { type: "text/plain" });
    await expect(upload(mockRechnungInvalid)).rejects.toThrow;
  });

});

describe('analyse function', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('analyse file successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 });
    await expect(analyse(mockRechnung)).resolves.not.toThrow();
  });

  it('handles server error during file analysis', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error', message: 'Analysis failed' }), { status: 500 });
    await expect(analyse(mockRechnung)).rejects.toThrow('Analysis failed');
  });

  it('rejects invalid file format during analyse', async () => {
    const mockRechnungInvalid = new File(["file contents"], "Rechnu123.txt", { type: "text/plain" });
    await expect(analyse(mockRechnungInvalid)).rejects.toThrow;
  });

});

describe('deleteStatus function', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('deletes file status successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 });
    await expect(deleteStatus(mockRechnung)).resolves.not.toThrow();
  });

  it('handles server error during file status delete', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error', message: 'Deletion failed' }), { status: 500 });
    await expect(deleteStatus(mockRechnung)).rejects.toThrow('Deletion failed');
  });

  it('rejects invalid file format during file status delete', async () => {
    const mockRechnungInvalid = new File(["file contents"], "Rechnu123.txt", { type: "text/plain" });
    await expect(deleteStatus(mockRechnungInvalid)).rejects.toThrow;
  });

});

describe('updateStatus function', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('uploads file successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 });
    await expect(updateStatus(mockRechnung)).resolves.not.toThrow();
  });

  it('handles server error during file status update', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error', message: 'Post-operation failed' }), { status: 500 });
    await expect(updateStatus(mockRechnung)).rejects.toThrow('Post-operation failed');
  });

  it('rejects invalid file format during file status update', async () => {
    const mockRechnungInvalid = new File(["file contents"], "Rechnu123.txt", { type: "text/plain" });
    await expect(updateStatus(mockRechnungInvalid)).rejects.toThrow;
  });

});

