import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { API_URL } from '../../../config';
import orderData from './orderData';

const httpClient = fetchUtils.fetchJson;

const handleFormatedDate = (date_created) => {
  const dateString = date_created;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatedDate = `${day}-${month}-${year}`;

  return formatedDate;
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    let url;
    if (resource === 'purchases') {
      url = `${API_URL}/checkout`;
    } else {
      url = `${API_URL}/${resource}`;
    }

    const response = await fetch(url);

    let data = await response.json();

    data = orderData(data, resource, order, field);

    const total = data.length;

    data = data.slice((page - 1) * perPage, page * perPage);
    if (resource === 'purchases') {
      data = data.map((purchase) => {
        return {
          id: purchase.id,
          Payer: `${purchase.payer?.last_name} ${purchase.payer?.first_name}`,
          Products: purchase.items
            .map((product) => `${product.quantity} X ${product.title}`)
            .join('----'),
          Date_of_Purcharse: handleFormatedDate(purchase.date_created),
          Status: purchase.status,
          Status_Detail: purchase.status_detail,
          Total_Paid: purchase.total_paid_amount.toFixed(2),
        };
      });
    } else if (resource === 'products') {
      data = data.map((d) => {
        return {
          ...d,
          id: d._id,
          categories: d.categories.name,
        };
      });
    } else if (resource === 'posts') {
      data = data.map((d) => {
        return {
          ...d,
          id: d._id,
          author: d.author.username,
          likes: d.likes.length,
        };
      });
    } else {
      data = data.map((d) => {
        return {
          ...d,
          id: d._id,
        };
      });
    }

    return {
      data: data,
      total: total,
    };
  },

  getOne: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}/${params.id}`);
    let data = await response.json();

    data = {
      data: {
        ...data,
        id: data.id,
      },
    };
    return data;
  },

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${API_URL}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${API_URL}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) => {
    console.log(11);
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${API_URL}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${API_URL}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }));
  },
};

export default dataProvider;
