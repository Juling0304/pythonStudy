from django.test import TestCase

# Create your tests here.
# python manage.py test 로 실행함.
class TestCase(TestCase):

    def test_add(self):
        c = 20 + 10
        self.assertEqual(c, 30)

    def test_add_error(self):
        c = 20 + 10
        self.assertEqual(c, 40)