from collections import OrderedDict

from rest_framework import pagination
from rest_framework import response


class APIPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return response.Response(
            OrderedDict([('page', self.page.number),
                         ('num_pages', self.page.paginator.num_pages),
                         ('results', data)]))
