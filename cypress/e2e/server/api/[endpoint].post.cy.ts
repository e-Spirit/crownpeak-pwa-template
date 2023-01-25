// @ts-ignore
import { FSXAProxyRoutes, FSXAApiErrors } from "fsxa-api/dist/lib/enums";
import { ComparisonQueryOperatorEnum } from "fsxa-api";
import { ServerErrors } from "~/types";

const baseURL = Cypress.env("cyBaseURL");

describe(`post to /api${FSXAProxyRoutes.FETCH_ELEMENT_ROUTE}`, () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it(`body contains existing id => return 200 and queried element`, () => {
    const id = "ec121aab-e29a-4e35-b97a-3dc33bb50d25";
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_ELEMENT_ROUTE}`,
      body: {
        locale: "de_DE",
        id,
      },
    }).should((response) => {
      expect(response.body.id).to.eq(id);
      expect(response.status).to.eq(200);
    });
  });

  it(`body contains unknown id => return 404`, () => {
    const id = "unknownId";
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_ELEMENT_ROUTE}`,
      body: {
        locale: "de_DE",
        id,
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq(FSXAApiErrors.NOT_FOUND);
    });
  });

  // TODO
  it.skip(`missing permissions => return 401`, () => {});

  it(`body is invalid => return 500`, () => {
    cy.eventNames();
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_ELEMENT_ROUTE}`,
      body: {
        locale: "de_DE",
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.exist;
    });
  });
});

describe(`post to /api${FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE}`, () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it(`query existing elements => return 200 and filtered elements`, () => {
    const id = "ec121aab-e29a-4e35-b97a-3dc33bb50d25";
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE}`,
      body: {
        locale: "de_DE",
        filters: [
          {
            value: id,
            field: "identifier",
            operator: ComparisonQueryOperatorEnum.EQUALS,
          },
        ],
      },
    }).should((response) => {
      expect(response.body.items[0].id).to.eq(id);
      expect(response.status).to.eq(200);
    });
  });

  it(`query unknown elements => return 200 and empty items array`, () => {
    const id = "unknownId";
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE}`,
      body: {
        locale: "de_DE",
        filters: [
          {
            value: id,
            field: "identifier",
            operator: ComparisonQueryOperatorEnum.EQUALS,
          },
        ],
      },
    }).should((response) => {
      expect(response.body.items).to.be.empty;
      expect(response.status).to.eq(200);
    });
  });

  // TODO
  it.skip(`missing permissions => return 401`, () => {});

  it(`body is invalid => return 500`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_BY_FILTER_ROUTE}`,
      body: {
        locale: "de_DE",
        filters: [
          {
            field: "identifier",
            operator: ComparisonQueryOperatorEnum.EQUALS,
          },
        ],
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.body.message).to.exist;
      expect(response.status).to.eq(500);
    });
  });
});

describe(`post to /api${FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE}`, () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it(`body contains valid locale => return navigation data`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE}`,
      body: {
        locale: "de_DE",
      },
    }).should((response) => {
      expect(response.body).to.have.all.keys([
        "idMap",
        "pages",
        "seoRouteMap",
        "structure",
        "meta",
      ]);
      expect(response.status).to.eq(200);
    });
  });

  it(`body contains invalid locale => return 404`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE}`,
      body: {
        locale: "invalid_locale",
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq(FSXAApiErrors.NOT_FOUND);
    });
  });

  // TODO
  it.skip(`missing permissions => return 401`, () => {});

  it(`body is invalid => return 500`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_NAVIGATION_ROUTE}`,
      body: { locale: "invalidLocaleFormat" },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(500);
      expect(response.body.message).to.exist;
    });
  });
});

describe(`post to /api${FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE}`, () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it(`body contains valid locale => return project properties`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE}`,
      body: { locale: "de_DE" },
    }).should((response) => {
      expect(response.body.type).to.eq("ProjectProperties");
      expect(response.status).to.eq(200);
    });
  });

  // TODO
  it.skip(`body contains ? => return 404`, () => {});

  // Tmissing permissions => return 401`, () => {});

  it(`body is invalid => return 500`, () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api${FSXAProxyRoutes.FETCH_PROPERTIES_ROUTE}`,
      body: { locale: "invalidLocaleFormat" },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.body.message).to.exist;
      expect(response.status).to.eq(500);
    });
  });
});

it("Unknown route", () => {
  cy.visit(baseURL);
  cy.request({
    method: "POST",
    url: `${baseURL}/api/unknown`,
    body: {},
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(500);
    expect(response.body.message).to.eq(ServerErrors.UNKNOWN_ROUTE);
  });
});
