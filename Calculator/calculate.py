from kivy.app import App
from kivy.uix.boxlayout import BoxLayout


class BnoApp(App):

    def build(self):
        return BoxLayout()


if __name__ == '__main__':
    BnoApp().run()