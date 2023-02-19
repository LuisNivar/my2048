// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock localStorage and sessionStorage
jest.spyOn(Storage.prototype, "removeItem");
jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem");
