export const SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS = "subscribe_companies";

export function addCompany({ id, company, lightLogo, darkLogo }) {
  const companies = getSubscribedCompanies();
  const idSet = new Set(companies.map(({ id }) => Number(id)));

  if (idSet.has(Number(id))) {
    console.error("이미 구독한 언론사입니다.");

    return;
  }

  companies.push({ id: Number(id), company, lightLogo, darkLogo });

  localStorage.setItem(SUBSCRIBE_COMPANIES_LOCAL_STORAGE_KEYS, JSON.stringify(companies));
}

export function removeCompany({ id }) {
  const companies = getSubscribedCompanies();

  const updatedCompanies = companies.filter(
    ({ id: companyId }) => Number(companyId) !== Number(id)
  );

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

export function isSubscribeCompany(companyId) {
  const companies = getSubscribedCompanies();

  return companies.some(({ id }) => Number(id) === Number(companyId));
}
