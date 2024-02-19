### For Certificate generator
### Docs

All you need

- Certificate
  - Design a [simple template](template.png) on [Canva](https://www.canva.com/)
- Font
  - A .ttf (True-Type Font) file like [this](/font), can simply be downloaded from [here](https://www.google.com/search?q=download+.ttf+fonts).
- Names
  - Finally, a list of names in a .txt format or a .csv format.

### Pillow module

Using the [pillow module](https://pypi.org/project/Pillow/) to make changes.
<br>

### Names

- Using `readlines()` method with a `.txt` format.

```python
names = []

with open('names.txt') as f:
    content = f.readlines()
    for item in content:
        names.append(item[:-1].title())
```
<br>

- Using [pandas to read a `.csv` file](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html).

```python
import pandas
names = pandas.read_csv('names.csv', sep='#')
```

<br>
