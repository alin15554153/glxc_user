$(document).ready(function() {
  $('#echarts').on('show.bs.collapse', function() {
    $('.arrow')
      .find('i')
      .removeClass('arrow_unfold')
      .addClass('arrow_fold')
  })
  $('#echarts').on('hide.bs.collapse', function() {
    $('.arrow')
      .find('i')
      .removeClass('arrow_fold')
      .addClass('arrow_unfold')
  })
})
