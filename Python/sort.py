import random
import time
import matplotlib.pyplot as plt
import matplotlib.animation as animation


def swap(A, i, j):
    """Helper function to swap the elements i and j of the list A."""

    if i != j:
        A[i], A[j] = A[j], A[i]


def bubble_sort(A):
    if len(A) == 1:
        return

    swapped = True
    for i in range(len(A) - 1):
        if not swapped:
            break

        swapped = False
        for j in range(len(A) - 1 - i):
            if A[j] > A[j+1]:
                swap(A, j, j + 1)
                swapped = True

            yield A


def insertion_sort(A):
    for i in range(1, len(A)):
        j = i
        while j > 0 and A[j] < A[j-1]:
            swap(A, j, j - 1)
            j -= 1
            yield A


def merge_sort(A, start, end):
    """Caller for Merge Sort"""
    if end <= start:
        return

    mid = start + ((end - start + 1) // 2) - 1
    yield from merge_sort(A, start, mid)
    yield from merge_sort(A, mid + 1, end)
    yield from merge(A, start, mid, end)
    yield A


def merge(A, start, mid, end):
    """Helper function for Merge Sort"""

    merged = []
    leftIdx = start
    rightIdx = mid + 1

    while leftIdx <= mid and rightIdx <= end:
        if A[leftIdx] < A[rightIdx]:
            merged.append(A[leftIdx])
            leftIdx += 1
        else:
            merged.append(A[rightIdx])
            rightIdx += 1

    while leftIdx <= mid:
        merged.append(A[leftIdx])
        leftIdx += 1

    while rightIdx <= end:
        merged.append(A[rightIdx])
        rightIdx += 1

    for i, sorted_val in enumerate(merged):
        A[start + i] = sorted_val
        yield A


def quick_sort(A, start, end):
    if start >= end:
        return

    pivot = A[end]
    pivotIdx = start

    for i in range(start, end):
        if A[i] < pivot:
            swap(A, i, pivotIdx)
            pivotIdx += 1
        yield A
    swap(A, end, pivotIdx)
    yield A

    yield from quick_sort(A, start, pivotIdx - 1)
    yield from quick_sort(A, pivotIdx + 1, end)


def selection_sort(A):
    if len(A) == 1:
        return

    for i in range(len(A)):
        # Find minimum unsorted value
        minVal = A[i]
        minIdx = i

        for j in range(i, len(A)):
            if A[j] < minVal:
                minVal = A[j]
                minIdx = j
            yield A
        swap(A, i, minIdx)
        yield A


def shell_sort(A):
    if len(A) == 1:
        return
    gap = len(A) // 2
    while gap > 0:
        for i in range(gap, len(A)):
            temp = A[i]
            j = i
            while j >= gap and A[j-gap] > temp:
                A[j] = A[j - gap]
                j -= gap

            A[j] = temp
            yield A
        gap //= 2


if __name__ == "__main__":
    # Get user input to determine the range of Integers (1 to N)
    # and desired sorting method/algorithm
    N = int(input("\n Enter the number of Integers: "))

    method_type = "Enter the Sorting Method :-\n" \
                  "(b)ubble\n" \
                  "(i)nsertion\n" \
                  "(m)erge\n" \
                  "(q)uick\n" \
                  "(s)election\n" \
                  "s(h)ell\n"
    method = input(method_type)

    # Build and randomly shuffle the list of Integers
    A = [x + 1 for x in range(N)]
    random.seed(time.time())
    random.shuffle(A)

    # Get the appropriate generator to supple to the matplolib FuncAnimation Method
    if method == "b":
        title = "Bubble Sort"
        generator = bubble_sort(A)
    elif method == "i":
        title = "Insertion Sort"
        generator = insertion_sort(A)
    elif method == "m":
        title = "Merge Sort"
        generator = merge_sort(A, 0, N - 1)
    elif method == "q":
        title = "Quick Sort"
        generator = quick_sort(A, 0, N - 1)
    elif method == "s":
        title = "Selection Sort"
        generator = selection_sort(A)
    elif method == "h":
        title = "Shell Sort"
        generator = shell_sort(A)
    else:
        print("\n\n Please select a valid sorting algorithm to execute.\n")

    # Initialize figure and axis
    fig, ax = plt.subplots()
    ax.set_title(title)

    # Initialize a bar plot. Note that matplotlib.pyplot.bar() returns a
    # list of rectangles (with each bar in the bar plot corresponding
    # to one rectangle), which we store in bar_rects.
    bar_rects = ax.bar(range(len(A)), A, align="edge")

    # Set axis limits. Sety axis upper limit high enough that the tops of
    # the bars won't overlap with the text label.
    ax.set_xlim(0, N)
    ax.set_ylim(0, int(1.07 * N))

    # Place a text label in the upper-left corner of the plot to display
    # the number of operations performed by the sorting algorithm
    # (each yield is treated as 1 operation).
    text = ax.text(0.02, 0.95, "", transform=ax.transAxes)

    # Define function update_fig() for use with matplotlib.pyplot.FuncAnimation().
    # To track the number of operations, i.e. iterations through which the
    # animation has gone, define a variable "iteration". This variable will
    # be passed to update_fig() to update the text label, and will also be
    # incremented in update_fig(). For this increment to be reflected outside
    # the function, we make "iteration" a list of 1 element, since lists
    # (and other mutable objects) are passed by reference (but  an integer would be
    # passed by value).
    # NOTE: Alternatively, iteration could be re-declared within update_fig()
    # with the "global" keyword (or "nonlocal" keyword).
    iteration = [0]

    def update_fig(A, rects, iteration):
        for rect, val in zip(rects, A):
            rect.set_height(val)
        iteration[0] += 1
        text.set_text("# of operations: {}".format(iteration[0]))

    anim = animation.FuncAnimation(fig, func=update_fig,
                                   fargs=(bar_rects, iteration), frames=generator,
                                   interval=1, repeat=False)
    plt.show()
