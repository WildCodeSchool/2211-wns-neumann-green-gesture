import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Register from "./Register/Register";

describe("Register component", () => {
  beforeEach(() =>
    render(
      <MockedProvider>
        <Register />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    )
  );

  it("should properly render the register page", () => {
    expect(screen.getByText(/Bienvenue chez Green Gesture !/)).toBeVisible();
    expect(screen.getByText(/Inscrivez-vous gratuitement/)).toBeVisible();
  });

  it("should properly render the free form", () => {
    expect(screen.getByText(/Inscrivez-vous gratuitement/)).toBeVisible();
    expect(screen.getByText(/Prénom/)).toBeVisible();
    expect(screen.getByText(/Nom/)).toBeVisible();
    expect(screen.getByText(/Email/)).toBeVisible();
    expect(screen.getByText(/Mot de passe/)).toBeVisible();
  });

  it("should properly render the partner form on click", () => {
    fireEvent.click(screen.getByText(/Partner/i));
    expect(
      screen.getByText(/Inscrivez-vous et votre entreprise/)
    ).toBeVisible();
    expect(screen.getByText(/Prénom/)).toBeVisible();
    expect(screen.getByText(/Nom/)).toBeVisible();
    expect(screen.getByText(/Email/)).toBeVisible();
    expect(screen.getByText(/Entreprise/)).toBeVisible();
    expect(screen.getByText(/Mot de passe/)).toBeVisible();
  });

  afterAll(() => cleanup());
});
