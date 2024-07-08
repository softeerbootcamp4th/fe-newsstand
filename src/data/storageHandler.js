export const SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS = "subscribe_companies";

export function subscribeCompany(company) {
  const companies = getSubscribedCompanies();

  companies.push(company);

  const companySet = new Set(companies);

  localStorage.setItem(
    SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS,
    JSON.stringify(Array.from(companySet))
  );
}

export function unsubscribeCompany(company) {
  const companies = getSubscribedCompanies();

  const updatedCompanies = companies.filter((name) => name !== company);

  localStorage.setItem(SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS, JSON.stringify(updatedCompanies));
}

export function getSubscribedCompanies() {
  try {
    const item = localStorage.getItem(SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS);

    const companies = JSON.parse(item);

    return companies ?? [];
  } catch {
    console.error("로컬 스토리지에서 목록을 불러오지 못했습니다.");

    return [];
  }
}

export function isSubscribeCompany(company) {
  const companies = getSubscribedCompanies();

  return companies.includes(company);
}
